import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'computer',
    description: 'Name of the product',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 499.99,
    description: 'Price of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;
}
