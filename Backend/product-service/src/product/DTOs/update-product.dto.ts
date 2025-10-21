import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'computer',
    description: 'Name of the product',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 499.99,
    description: 'Price of the product',
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({
    example: true,
    description: 'Active status of the product',
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
