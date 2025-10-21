import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderServiceClient } from '../interfaces/order.interface';
import { CreateOrderRequest, Response } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { callGrpcService } from '../../shared/utils/helpers';
import { ListOrdersDto } from '../../order/DTOs/list-orders.dto';
import { UpdateOrderDto } from '../../order/DTOs/update-order.dto';
import { DeleteOrderProductsDto } from '../../order/DTOs/delete-order-products.dto';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private orderService: OrderServiceClient;

  constructor(@Inject('ORDER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<OrderServiceClient>('OrderService');
  }

  async createOrder(data: CreateOrderRequest): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.createOrder(data) as unknown as Observable<Response>,
    );

    return response;
  }

  async updateOrderById(
    id: string,
    payload: UpdateOrderDto,
  ): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.updateOrderById({
          id,
          payload,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async listOrders(data: ListOrdersDto): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.listOrders({
          queries: data,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async deleteOrderById(id: string): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.deleteOrderById({
          id,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async findOrderById(id: string): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.findOrderById({
          id,
        }) as unknown as Observable<Response>,
    );

    return response;
  }

  async deleteOrderProducts(
    id: string,
    payload: DeleteOrderProductsDto,
  ): Promise<Response> {
    const response = await callGrpcService(
      () =>
        this.orderService.deleteOrderProducts({
          id,
          productIds: payload.productIds,
        }) as unknown as Observable<Response>,
    );

    return response;
  }
}
