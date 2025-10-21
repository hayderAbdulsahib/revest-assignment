import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductRequest } from '../interfaces/product/create.interface';
import { ErrorObject } from '../interfaces/error/error.interface';
import { ListProductsQueries } from '../interfaces/product/list.interface';
import { generateWhereFilters } from '../shared/utils/productList.helper';
import { UpdateProductPayload } from '../interfaces/product/update.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(data: CreateProductRequest): Promise<Product | null> {
    try {
      const result = await this.productRepository.insert(data);
      const insertedId = result.identifiers[0].id as string;

      const product = await this.productRepository.findOne({
        where: { id: insertedId },
      });

      return product;
    } catch (err) {
      const error = err as ErrorObject;
      let errMsg = error.message;

      // Check if it's a duplicate entry error for the name field
      if (error.code === 'ER_DUP_ENTRY') {
        errMsg = 'name already exist';
      }

      throw new BadRequestException(errMsg);
    }
  }

  async updateProductById(
    id: string,
    payload: UpdateProductPayload,
  ): Promise<Product | null> {
    try {
      const updatedResult = await this.productRepository.update(id, payload);

      if (updatedResult.affected === 0) {
        throw new BadRequestException('Product not found');
      }

      const updatedProduct = await this.productRepository.findOne({
        where: { id },
      });
      return updatedProduct;
    } catch (err) {
      const error = err as ErrorObject;
      let errMsg = error.message;

      // Check if it's a duplicate entry error for the name field
      if (error.code === 'ER_DUP_ENTRY') {
        errMsg = 'name already exist';
      }

      throw new BadRequestException(errMsg);
    }
  }

  async listProducts(
    quires: ListProductsQueries,
  ): Promise<Record<string, unknown>> {
    const limit = quires?.limit ?? 10;
    const page = quires?.page ?? 1;
    const search = quires?.search ?? undefined;

    const whereConditions = generateWhereFilters(quires, search);

    const productsPromise = this.productRepository.find({
      where: whereConditions,
      order: { [quires?.sortBy ?? 'name']: quires?.sortOrder ?? 'DESC' },
      skip: page && limit ? limit * (page - 1) : undefined,
      take: limit ?? undefined,
    });

    const totalFiltersCountPromise = this.productRepository.count({
      where: whereConditions,
    });

    const [products, totalFiltersCount] = await Promise.all([
      productsPromise,
      totalFiltersCountPromise,
    ]);

    return { totalFiltersCount, products };
  }

  async deleteProductById(id: string): Promise<any> {
    const deletedProduct = await this.productRepository.update(id, {
      isDeleted: true,
      name: new Date().toISOString(), // because the name is unique and we need to delete the product
    });

    if (deletedProduct.affected === 0) {
      throw new BadRequestException('Product not found');
    }

    return deletedProduct;
  }

  async findProductById(id: string): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      return product;
    } catch (err) {
      const error = err as ErrorObject;
      const errMsg = error.message;

      throw new BadRequestException(errMsg);
    }
  }
}
