import { Between, FindOptionsWhere, Like } from 'typeorm';
import { ListProductsQueries } from '../../interfaces/product/list.interface';
import { Product } from '../../entities/product.entity';

export const generateWhereFilters = (
  queries: ListProductsQueries,
  search?: string,
): FindOptionsWhere<Product> => {
  const whereConditions: FindOptionsWhere<Product> = {};

  if (queries?.isActive !== undefined) {
    whereConditions.isActive = queries.isActive;
  }

  whereConditions.isDeleted = queries?.isDeleted ?? false;

  if (queries?.minPrice !== undefined && queries?.maxPrice !== undefined) {
    whereConditions.price = Between(queries.minPrice, queries.maxPrice);
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
    whereConditions.name = Like(`%${search}%`);
  }

  return whereConditions;
};
