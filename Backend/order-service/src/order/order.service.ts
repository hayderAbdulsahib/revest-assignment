import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './DTOs/create-order.dto';
import { ListOrdersDto } from './DTOs/list-orders.dto';
import { UpdateOrderDto } from './DTOs/update-order.dto';
import { DeleteOrderProductsDto } from './DTOs/delete-order-products.dto';
import { GrpcClientService } from '../grpc/datasource-service/grpc-client.service';

@Injectable()
export class OrderService {
  constructor(private readonly grpcClient: GrpcClientService) {}

  async createOrder(payload: CreateOrderDto): Promise<any> {
    const orderResponse = await this.grpcClient.createOrder(payload);

    return orderResponse.data;
  }

  async listOrders(queries: ListOrdersDto): Promise<any> {
    const ordersResponse = await this.grpcClient.listOrders(queries);

    return ordersResponse.data;
  }

  async updateOrderById(id: string, payload: UpdateOrderDto): Promise<any> {
    const orderResponse = await this.grpcClient.updateOrderById(id, payload);

    return orderResponse.data;
  }

  async deleteOrderById(id: string): Promise<any> {
    const orderResponse = await this.grpcClient.deleteOrderById(id);

    return orderResponse.data;
  }

  async findOrderById(id: string): Promise<any> {
    const orderResponse = await this.grpcClient.findOrderById(id);

    return orderResponse.data;
  }

  async deleteOrderProducts(
    id: string,
    payload: DeleteOrderProductsDto,
  ): Promise<any> {
    const orderResponse = await this.grpcClient.deleteOrderProducts(
      id,
      payload,
    );

    return orderResponse.data;
  }
}
