import { Between, FindOptionsWhere, Like } from 'typeorm';
import { ListOrdersQueries } from '../../interfaces/order/list.interface';
import { Order } from '../../entities/order.entity';

export const generateWhereFilters = (
  queries: ListOrdersQueries,
  search?: string,
): FindOptionsWhere<Order> => {
  const whereConditions: FindOptionsWhere<Order> = {};

  if (queries?.status !== undefined) {
    whereConditions.status = queries.status;
  }

  if (queries?.isCanceled !== undefined) {
    whereConditions.isCanceled = queries.isCanceled;
  }

  if (queries?.customerName !== undefined) {
    whereConditions.customerName = Like(`%${queries.customerName}%`);
  }

  if (queries?.customerEmail !== undefined) {
    whereConditions.customerEmail = Like(`%${queries.customerEmail}%`);
  }

  if (queries?.customerPhone !== undefined) {
    whereConditions.customerPhone = Like(`%${queries.customerPhone}%`);
  }

  if (queries?.createdFrom !== undefined && queries?.createdTo !== undefined) {
    whereConditions.createdAt = Between(
      queries.createdFrom,
      queries.createdTo,
    ) as unknown as Date;
  }

  if (queries?.updatedFrom !== undefined && queries?.updatedTo !== undefined) {
    whereConditions.updatedAt = Between(
      queries.updatedFrom,
      queries.updatedTo,
    ) as unknown as Date;
  }

  if (search) {
    whereConditions.customerName = Like(`%${search}%`);
  }

  return whereConditions;
};

export function calculateTotals(
  orders: Order[],
): (Order & { totalProducts: number; totalPrice: number })[] {
  return orders.map((order) => ({
    ...order,
    totalProducts: order.orderProducts?.length || 0,
    totalPrice:
      order.orderProducts?.reduce(
        (sum, orderProduct) =>
          sum +
          (parseFloat(orderProduct.product?.price?.toString() || '0') || 0),
        0,
      ) || 0,
  }));
}
