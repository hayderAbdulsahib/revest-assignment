import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';

export class DeleteOrderProductsDto {
  @ApiProperty({
    example: [
      '38306852-9737-4765-96f6-2b3256880cf7',
      '3fb84105-8d11-4746-b9da-20584cad37e2',
    ],
    description: 'Array of product IDs to remove from the order',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product ID must be provided' })
  @IsUUID('4', { each: true, message: 'Each product ID must be a valid UUID' })
  productIds: string[];
}
