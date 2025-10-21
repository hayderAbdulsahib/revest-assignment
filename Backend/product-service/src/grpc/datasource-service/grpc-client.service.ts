import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductServiceClient } from '../interfaces/product.interface';
import {
  CreateProductRequest,
  Response,
} from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { callGrpcService } from '../../shared/utils/helpers';
import { ListProductsDto } from 'src/product/DTOs/list-products.dto';
import { UpdateProductDto } from 'src/product/DTOs/update-product.dto';
@Injectable()
export class GrpcClientService implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>('ProductService');
  }

  async createProduct(data: CreateProductRequest): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.productService.createProduct(
          data,
        ) as unknown as Observable<Response>,
    );

    return response;
  }

  async updateProductById(
    id: string,
    payload: UpdateProductDto,
  ): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.productService.updateProductById({
          id,
          payload,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async listProducts(data: ListProductsDto): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.productService.listProducts({
          queries: data,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async deleteProductById(id: string): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.productService.deleteProductById({
          id,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async findProductById(id: string): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.productService.findProductById({
          id,
        }) as unknown as Observable<Response>,
    );

    return response;
  }
}
