import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  Min,
  IsString,
  IsBoolean,
  IsDateString,
  IsEnum,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

import { ProductFields } from '../../shared/constants/product-fields';
import { SortOrderValues } from '../../shared/constants/sort-order-values';

@ValidatorConstraint({ name: 'isMaxPriceGreaterThanMinPrice', async: false })
export class IsMaxPriceGreaterThanMinPriceConstraint
  implements ValidatorConstraintInterface
{
  validate(maxPrice: number, args: ValidationArguments) {
    const object = args.object as ListProductsDto;
    if (maxPrice && object.minPrice) {
      return maxPrice > object.minPrice;
    }
    return true; // If either value is not provided, validation passes
  }

  defaultMessage() {
    return 'MaxPrice must be greater than MinPrice';
  }
}

@ValidatorConstraint({
  name: 'isCreatedToGreaterThanCreatedFrom',
  async: false,
})
export class IsCreatedToGreaterThanCreatedFromConstraint
  implements ValidatorConstraintInterface
{
  validate(createdTo: string, args: ValidationArguments) {
    const object = args.object as ListProductsDto;
    if (createdTo && object.createdFrom) {
      const toDate = new Date(createdTo);
      const fromDate = new Date(object.createdFrom);
      return toDate > fromDate;
    }
    return true; // If either value is not provided, validation passes
  }

  defaultMessage() {
    return 'CreatedTo must be greater than CreatedFrom';
  }
}

@ValidatorConstraint({
  name: 'isUpdatedToGreaterThanUpdatedFrom',
  async: false,
})
export class IsUpdatedToGreaterThanUpdatedFromConstraint
  implements ValidatorConstraintInterface
{
  validate(updatedTo: string, args: ValidationArguments) {
    const object = args.object as ListProductsDto;
    if (updatedTo && object.updatedFrom) {
      const toDate = new Date(updatedTo);
      const fromDate = new Date(object.updatedFrom);
      return toDate > fromDate;
    }
    return true; // If either value is not provided, validation passes
  }

  defaultMessage() {
    return 'UpdatedTo must be greater than UpdatedFrom';
  }
}

export class ListProductsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 1;
    }
    const parsed = parseInt(value as string);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a valid number' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 10;
    }
    const parsed = parseInt(value as string);
    return isNaN(parsed) ? 10 : parsed;
  })
  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a valid number' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: ProductFields.NAME,
    default: ProductFields.NAME,
    enum: ProductFields,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return ProductFields.CREATED_AT;
    }
    return value as string;
  })
  @IsOptional()
  @IsEnum(ProductFields, {
    message: `SortBy must be one of: ${Object.values(ProductFields).join(', ')}`,
  })
  sortBy?: ProductFields;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: SortOrderValues.ASC,
    enum: SortOrderValues,
    default: SortOrderValues.ASC,
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return SortOrderValues.DESC;
    }
    return value as string;
  })
  @IsOptional()
  @IsEnum(SortOrderValues, {
    message: `SortOrder must be one of: ${Object.values(SortOrderValues).join(', ')}`,
  })
  sortOrder?: SortOrderValues;

  @ApiPropertyOptional({
    description: 'Search term to search across multiple fields',
  })
  @IsOptional()
  @IsString({ message: 'Search must be a valid string' })
  search?: string;

  // Product-specific filters
  @ApiPropertyOptional({
    description: 'Filter by minimum price',
  })
  @Transform(({ value }) => parseFloat(value as string) || undefined)
  @IsOptional()
  @IsNumber({}, { message: 'MinPrice must be a valid number' })
  @Min(1, { message: 'MinPrice must be at least 1' })
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Filter by maximum price',
  })
  @Transform(({ value }) => parseFloat(value as string) || undefined)
  @IsOptional()
  @IsNumber({}, { message: 'MaxPrice must be a valid number' })
  @Min(1, { message: 'MaxPrice must be at least 1' })
  @Validate(IsMaxPriceGreaterThanMinPriceConstraint)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @Transform(({ value }) => {
    if (value == 'true' || value == true) {
      return true;
    } else if (value == 'false' || value == false) {
      return false;
    }
    return true;
  })
  @IsOptional()
  @IsBoolean({ message: 'IsActive must be a valid boolean' })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by deleted status',
    example: false,
  })
  @Transform(({ value }) => {
    if (value == 'true' || value == true) {
      return true;
    } else if (value == 'false' || value == false) {
      return false;
    }
    return false;
  })
  @IsOptional()
  @IsBoolean({ message: 'IsDeleted must be a valid boolean' })
  isDeleted?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by creation from date (ISO string)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'CreatedFrom must be a valid ISO date string (e.g., 2023-01-01T00:00:00.000Z)',
    },
  )
  createdFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by creation to date range (ISO string)',
    example: '2026-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'CreatedTo must be a valid ISO date string (e.g., 2023-01-01T00:00:00.000Z)',
    },
  )
  @Validate(IsCreatedToGreaterThanCreatedFromConstraint)
  createdTo?: string;

  @ApiPropertyOptional({
    description: 'Filter by updated from date (ISO string)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'UpdatedFrom must be a valid ISO date string (e.g., 2023-01-01T00:00:00.000Z)',
    },
  )
  updatedFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by updated to date (ISO string)',
    example: '2026-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'UpdatedTo must be a valid ISO date string (e.g., 2023-01-01T00:00:00.000Z)',
    },
  )
  @Validate(IsUpdatedToGreaterThanUpdatedFromConstraint)
  updatedTo?: string;
}
