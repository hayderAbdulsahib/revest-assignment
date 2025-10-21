import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderProduct } from 'src/entities/order_product.entity';
import { CreateOrderRequest } from '../interfaces/order/create.interface';
import { ErrorObject } from '../interfaces/error/error.interface';
import { ListOrdersQueries } from '../interfaces/order/list.interface';
import {
  generateWhereFilters,
  calculateTotals,
} from '../shared/utils/orderList.helper';
import { UpdateOrderPayload } from '../interfaces/order/update.interface';
import { DataSource, In } from 'typeorm';
import { getFormattedProductAndOrderIds } from '../shared/utils/updateOrder.helpers';
import { OrderStatusValues } from '../shared/constants/order-status-values';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async createOrder(data: CreateOrderRequest): Promise<Order | null> {
    try {
      // to prevent duplicate product ids in the request
      const uniqueProductIds = [...new Set(data.productIds)];
      const productIds = uniqueProductIds.map((productId) => {
        return { productId };
      });

      const savedOrder = await this.orderRepository.save({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        notes: data.notes || '',
        orderProducts: productIds,
      });

      const createdOrder = await this.orderRepository.findOne({
        where: { id: savedOrder.id },
        relations: ['orderProducts.product'],
      });

      return calculateTotals([createdOrder as Order])?.[0] || null;
    } catch (err) {
      const error = err as ErrorObject;
      let errMsg = error.message;

      if (
        errMsg.includes('foreign key constraint fails') &&
        errMsg.includes('productId')
      ) {
        errMsg = 'One or more of the provided product IDs are invalid';
      }

      throw new BadRequestException(errMsg);
    }
  }

  async updateOrderById(
    id: string,
    payload: UpdateOrderPayload,
  ): Promise<Order | null> {
    try {
      const { productIds, ...orderData } = payload;

      // to prevent duplicate product ids in the request
      const uniqueProductIds = [...new Set(productIds)];

      const perviousOrderDetails = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderProducts'],
      });

      if (!perviousOrderDetails) {
        throw new BadRequestException('Order not found');
      }

      const formattedProductAndOrderIds = getFormattedProductAndOrderIds(
        id,
        perviousOrderDetails.orderProducts,
        uniqueProductIds,
      );

      await this.dataSource.transaction(async (manager) => {
        await manager.update(Order, id, {
          ...orderData,
        });

        if (formattedProductAndOrderIds.length) {
          await manager.insert(OrderProduct, formattedProductAndOrderIds);
        }
      });

      const updatedOrder = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderProducts.product'],
      });

      return calculateTotals([updatedOrder as Order])?.[0] || null;
    } catch (err) {
      const error = err as ErrorObject;
      let errMsg = error.message;

      if (
        errMsg.includes('foreign key constraint fails') &&
        errMsg.includes('productId')
      ) {
        errMsg = 'One or more of the provided product IDs are invalid';
      }

      throw new BadRequestException(errMsg);
    }
  }

  async listOrders(
    queries: ListOrdersQueries,
  ): Promise<Record<string, unknown>> {
    const limit = queries?.limit ?? 10;
    const page = queries?.page ?? 1;
    const search = queries?.search ?? undefined;

    const whereConditions = generateWhereFilters(queries, search);

    const ordersPromise = this.orderRepository.find({
      where: whereConditions,
      order: { [queries?.sortBy ?? 'createdAt']: queries?.sortOrder ?? 'DESC' },
      skip: page && limit ? limit * (page - 1) : undefined,
      take: limit ?? undefined,
      relations: ['orderProducts.product'],
    });

    const totalFiltersCountPromise = this.orderRepository.count({
      where: whereConditions,
    });

    const [orders, totalFiltersCount] = await Promise.all([
      ordersPromise,
      totalFiltersCountPromise,
    ]);

    return { totalFiltersCount, orders: calculateTotals(orders) };
  }

  async deleteOrderById(id: string): Promise<any> {
    const deletedOrder = await this.orderRepository.update(id, {
      isCanceled: true,
      status: OrderStatusValues.CANCELLED,
    });

    if (deletedOrder.affected === 0) {
      throw new BadRequestException('Order not found');
    }

    return deletedOrder;
  }

  async findOrderById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderProducts.product'],
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    return calculateTotals([order])?.[0] || null;
  }

  async deleteOrderProducts(id: string, productIds: string[]): Promise<any> {
    const deletedProducts = await this.orderProductRepository.delete({
      orderId: id,
      productId: In(productIds),
    });

    if (deletedProducts.affected === 0) {
      throw new BadRequestException(
        'Either The Order Or The Product Id Is Not Found',
      );
    }

    return deletedProducts;
  }
}
