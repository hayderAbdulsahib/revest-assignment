import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './DTOs/create-product.dto';
import { ListProductsDto } from './DTOs/list-products.dto';
import { GrpcClientService } from '../grpc/datasource-service/grpc-client.service';
import { UpdateProductDto } from './DTOs/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly grpcClient: GrpcClientService) {}

  async createProduct(payload: CreateProductDto): Promise<any> {
    const productResponse = await this.grpcClient.createProduct({
      name: payload.name,
      price: payload.price,
    });

    return productResponse.data;
  }

  async listProducts(queries: ListProductsDto): Promise<any> {
    const productsResponse = await this.grpcClient.listProducts(queries);

    return productsResponse.data;
  }

  async updateProductById(id: string, payload: UpdateProductDto): Promise<any> {
    const productResponse = await this.grpcClient.updateProductById(
      id,
      payload,
    );

    return productResponse.data;
  }

  async deleteProductById(id: string): Promise<any> {
    const productResponse = await this.grpcClient.deleteProductById(id);

    return productResponse.data;
  }

  async findProductById(id: string): Promise<any> {
    const productResponse = await this.grpcClient.findProductById(id);

    return productResponse.data;
  }
}
