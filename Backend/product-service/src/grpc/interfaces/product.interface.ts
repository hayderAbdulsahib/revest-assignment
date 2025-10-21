import { ListProductsDto } from 'src/product/DTOs/list-products.dto';
import { UpdateProductDto } from '../../product/DTOs/update-product.dto';
export interface Response {
  isError: boolean;
  message: string;
  data: string;
}

export interface ParsedResponse {
  isError: boolean;
  message: string;
  data: any;
}

export interface CreateProductRequest {
  name: string;
  price: number;
}

export interface ListProductsRequest {
  queries: ListProductsDto;
}

export interface UpdateProductByIdRequest {
  id: string;
  payload: UpdateProductDto;
}

export interface DeleteProductByIdRequest {
  id: string;
}

export interface FindProductByIdRequest {
  id: string;
}

export interface ProductServiceClient {
  createProduct(data: CreateProductRequest): Promise<Response>;
  listProducts(data: ListProductsRequest): Promise<Response>;
  updateProductById(data: UpdateProductByIdRequest): Promise<Response>;
  deleteProductById(data: DeleteProductByIdRequest): Promise<Response>;
  findProductById(data: FindProductByIdRequest): Promise<Response>;
}
