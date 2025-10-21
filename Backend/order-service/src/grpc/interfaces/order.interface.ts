import { ListOrdersDto } from '../../order/DTOs/list-orders.dto';
import { UpdateOrderDto } from '../../order/DTOs/update-order.dto';
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

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  productIds: string[];
}

export interface ListOrdersRequest {
  queries: ListOrdersDto;
}

export interface UpdateOrderByIdRequest {
  id: string;
  payload: UpdateOrderDto;
}

export interface DeleteOrderByIdRequest {
  id: string;
}

export interface FindOrderByIdRequest {
  id: string;
}

export interface DeleteOrderProductsRequest {
  id: string;
  productIds: string[];
}

export interface OrderServiceClient {
  createOrder(data: CreateOrderRequest): Promise<Response>;
  listOrders(data: ListOrdersRequest): Promise<Response>;
  updateOrderById(data: UpdateOrderByIdRequest): Promise<Response>;
  deleteOrderById(data: DeleteOrderByIdRequest): Promise<Response>;
  findOrderById(data: FindOrderByIdRequest): Promise<Response>;
  deleteOrderProducts(data: DeleteOrderProductsRequest): Promise<Response>;
}
