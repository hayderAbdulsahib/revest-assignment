import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MaxLength,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the customer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the customer',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  customerEmail: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the customer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  customerPhone: string;

  @ApiPropertyOptional({
    example: 'Please deliver after 5 PM',
    description: 'Additional notes for the order',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({
    example: [
      '38306852-9737-4765-96f6-2b3256880cf7',
      '3fb84105-8d11-4746-b9da-20584cad37e2',
    ],
    description: 'Array of products to include in the order',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true, message: 'Each product ID must be a valid UUID' })
  productIds: string[];
}
