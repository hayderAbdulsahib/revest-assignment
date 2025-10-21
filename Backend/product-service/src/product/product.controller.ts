import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTOs/create-product.dto';
import { ListProductsDto } from './DTOs/list-products.dto';
import { UpdateProductDto } from './DTOs/update-product.dto';
import { ProductFields } from '../shared/constants/product-fields';
import { SortOrderValues } from '../shared/constants/sort-order-values';
import { UuidValidationPipe } from '../shared/pipes/uuidValidationPipe.pipe';
@ApiTags('Products APIs')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @ApiBody({
    type: CreateProductDto,
    description: 'Create Product',
    required: true,
  })
  @ApiOperation({
    summary: 'This API is responsible for creating a product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product Created successfully ',
    example: {
      id: '9f83cc05-741f-478f-9852-705f98da96bf',
      name: 'computer',
      price: '499.99',
      isActive: true,
      isDeleted: false,
      createdAt: '2025-10-18T12:49:52.963Z',
      updatedAt: '2025-10-18T12:49:52.963Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      clientError: {
        summary: 'Name Already Exists',
        value: {
          message: 'name already exist',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async createProduct(@Body() payload: CreateProductDto): Promise<any> {
    return await this.productService.createProduct(payload);
  }

  @Get('/')
  @ApiOperation({
    summary:
      'This API is responsible for listing products with filtering, search, ordering, and pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ProductFields,
    description: 'Field to sort by (default: createdAt)',
    example: ProductFields.CREATED_AT,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: SortOrderValues,
    description: 'Sort order (default: DESC)',
    example: SortOrderValues.DESC,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to search across multiple fields',
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    type: Number,
    description: 'Filter by minimum price',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    type: Number,
    description: 'Filter by maximum price',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filter by active status',
    example: true,
  })
  @ApiQuery({
    name: 'isDeleted',
    required: false,
    type: Boolean,
    description: 'Filter by deleted status',
    example: false,
  })
  @ApiQuery({
    name: 'createdFrom',
    required: false,
    type: String,
    description: 'Filter by creation from date (ISO string)',
  })
  @ApiQuery({
    name: 'createdTo',
    required: false,
    type: String,
    description: 'Filter by creation to date (ISO string)',
  })
  @ApiQuery({
    name: 'updatedFrom',
    required: false,
    type: String,
    description: 'Filter by updated from date (ISO string)',
  })
  @ApiQuery({
    name: 'updatedTo',
    required: false,
    type: String,
    description: 'Filter by updated to date (ISO string)',
  })
  @ApiResponse({
    status: 200,
    description: 'Products listed successfully with pagination info',
    example: {
      totalFiltersCount: 6,
      products: [
        {
          id: 'bded9b0e-e142-49ca-90ef-66e0d945fd6e',
          name: 'phone samsung',
          price: '200.00',
          isActive: true,
          isDeleted: false,
          createdAt: '2025-10-13T20:03:59.825Z',
          updatedAt: '2025-10-18T20:07:31.466Z',
        },
        {
          id: '38306852-9737-4765-96f6-2b3256880cf7',
          name: 'shampo',
          price: '10.00',
          isActive: true,
          isDeleted: false,
          createdAt: '2025-10-11T20:04:22.882Z',
          updatedAt: '2025-10-18T20:07:44.510Z',
        },
      ],
    },
  })
  async listProducts(@Query() queries: ListProductsDto): Promise<any> {
    return this.productService.listProducts(queries);
  }

  @Put('/:id')
  @ApiBody({
    type: UpdateProductDto,
    description: 'Update Product',
    required: true,
  })
  @ApiOperation({
    summary: 'This API is responsible for updating a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product Updated Successfully ',
    example: {
      id: '9f83cc05-741f-478f-9852-705f98da96bf',
      name: 'computer',
      price: '499.99',
      isActive: true,
      isDeleted: false,
      createdAt: '2025-10-18T12:49:52.963Z',
      updatedAt: '2025-10-18T12:49:52.963Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      duplicateName: {
        summary: 'Name Already Exists',
        value: {
          message: 'name already exist',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      wrongId: {
        summary: 'Product Not Found',
        value: {
          message: 'Product not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async updateProduct(
    @Param('id', UuidValidationPipe) id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<any> {
    return await this.productService.updateProductById(id, payload);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'This API is responsible for deleting a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product Deleted Successfully ',
    example: {
      generatedMaps: [],
      raw: [],
      affected: 1,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongId: {
        summary: 'Product Not Found',
        value: {
          message: 'Product not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async deleteProduct(
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<any> {
    return await this.productService.deleteProductById(id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'This API is responsible for finding a product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product found successfully',
    example: {
      id: '9f83cc05-741f-478f-9852-705f98da96bf',
      name: 'computer',
      price: '499.99',
      isActive: true,
      isDeleted: false,
      createdAt: '2025-10-18T12:49:52.963Z',
      updatedAt: '2025-10-18T12:49:52.963Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongId: {
        summary: 'Product Not Found',
        value: {
          message: 'Product not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      invalidUuid: {
        summary: 'Invalid UUID Format',
        value: {
          message: 'Invalid UUID format',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async findProduct(@Param('id', UuidValidationPipe) id: string): Promise<any> {
    return await this.productService.findProductById(id);
  }
}
