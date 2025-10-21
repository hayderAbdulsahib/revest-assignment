import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  MaxLength,
  IsBoolean,
  IsArray,
  IsUUID,
} from 'class-validator';
import { OrderStatusValues } from '../../shared/constants/order-status-values';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    example: OrderStatusValues.PENDING,
    description: 'Status of the order',
    enum: OrderStatusValues,
  })
  @IsOptional()
  @IsEnum(OrderStatusValues)
  status?: OrderStatusValues;

  @ApiPropertyOptional({
    example: 'Customer requested cancellation',
    description: 'Reason for cancellation if applicable',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  cancellationReason?: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Name of the customer',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email address of the customer',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  customerEmail?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number of the customer',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  customerPhone?: string;

  @ApiPropertyOptional({
    example: 'Please deliver after 5 PM',
    description: 'Additional notes for the order',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the order is cancelled',
  })
  @IsOptional()
  @IsBoolean()
  isCanceled?: boolean;

  @ApiPropertyOptional({
    example: [
      '38306852-9737-4765-96f6-2b3256880cf7',
      '3fb84105-8d11-4746-b9da-20584cad37e2',
    ],
    description: 'Array of products to include in the order',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Each product ID must be a valid UUID' })
  productIds?: string[];
}
