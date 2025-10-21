import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderRequest } from '../interfaces/order/create.interface';
import { OrderService } from './order.service';
import { StandardResponse } from '../interfaces/response/standardResponse.interface';
import { callGrpcService } from '../shared/utils/grpcCallService.helpers';
import { ListOrdersRequest } from '../interfaces/order/list.interface';
import { UpdateOrderRequest } from '../interfaces/order/update.interface';
import { DeleteOrderRequest } from '../interfaces/order/delete.interface';
import { FindOrderRequest } from '../interfaces/order/find.interface';
import { DeleteOrderProductsRequest } from '../interfaces/order/delete-order-products.interface';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  async createOrder(data: CreateOrderRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.orderService.createOrder(data),
      logger: this.logger,
      controllerName: 'createOrder',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('OrderService', 'ListOrders')
  async listOrders(data: ListOrdersRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.orderService.listOrders(data?.queries),
      logger: this.logger,
      controllerName: 'listOrders',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('OrderService', 'UpdateOrderById')
  async updateOrder(data: UpdateOrderRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () =>
        this.orderService.updateOrderById(data?.id, data?.payload),
      logger: this.logger,
      controllerName: 'updateOrder',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('OrderService', 'DeleteOrderById')
  async deleteOrder(data: DeleteOrderRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.orderService.deleteOrderById(data?.id),
      logger: this.logger,
      controllerName: 'deleteOrder',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('OrderService', 'FindOrderById')
  async findOrder(data: FindOrderRequest): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () => this.orderService.findOrderById(data?.id),
      logger: this.logger,
      controllerName: 'findOrder',
    })) as unknown as StandardResponse;

    return result;
  }

  @GrpcMethod('OrderService', 'DeleteOrderProducts')
  async deleteOrderProducts(
    data: DeleteOrderProductsRequest,
  ): Promise<StandardResponse> {
    const result = (await callGrpcService({
      grpcCall: () =>
        this.orderService.deleteOrderProducts(data?.id, data?.productIds),
      logger: this.logger,
      controllerName: 'deleteOrderProducts',
    })) as unknown as StandardResponse;

    return result;
  }
}
