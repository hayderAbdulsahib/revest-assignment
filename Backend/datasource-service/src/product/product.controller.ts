import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductRequest } from '../interfaces/product/create.interface';
import { ProductService } from './product.service';
import { StandardResponse } from '../interfaces/response/standardResponse.interface';
import { callGrpcService } from '../shared/utils/grpcCallService.helpers';
import { ListProductsRequest } from '../interfaces/product/list.interface';
import {
  UpdateProductRequest,
  UpdateProductPayload,
} from '../interfaces/product/update.interface';
import { DeleteProductRequest } from '../interfaces/product/delete.interface';
import { FindProductRequest } from '../interfaces/product/find.interface';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: CreateProductRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.productService.createProduct(data),
      logger: this.logger,
      controllerName: 'createProduct',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('ProductService', 'ListProducts')
  async listProducts(data: ListProductsRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.productService.listProducts(data?.queries),
      logger: this.logger,
      controllerName: 'listProducts',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('ProductService', 'UpdateProductById')
  async updateProduct(data: UpdateProductRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () =>
        this.productService.updateProductById(
          data?.id,
          data?.payload as UpdateProductPayload,
        ),
      logger: this.logger,
      controllerName: 'updateProduct',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('ProductService', 'DeleteProductById')
  async deleteProduct(data: DeleteProductRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.productService.deleteProductById(data?.id),
      logger: this.logger,
      controllerName: 'deleteProduct',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('ProductService', 'FindProductById')
  async findProduct(data: FindProductRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.productService.findProductById(data?.id),
      logger: this.logger,
      controllerName: 'findProduct',
    })) as unknown as StandardResponse;

    return result;
  }
}
