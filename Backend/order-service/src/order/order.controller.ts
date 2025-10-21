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
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTOs/create-order.dto';
import { ListOrdersDto } from './DTOs/list-orders.dto';
import { UpdateOrderDto } from './DTOs/update-order.dto';
import { DeleteOrderProductsDto } from './DTOs/delete-order-products.dto';
import { OrderFields } from '../shared/constants/order-fields';
import { SortOrderValues } from '../shared/constants/sort-order-values';
import { OrderStatusValues } from '../shared/constants/order-status-values';
import { UuidValidationPipe } from '../shared/pipes/uuidValidationPipe.pipe';

@ApiTags('Orders APIs')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  @ApiBody({
    type: CreateOrderDto,
    description: 'Create Order',
    required: true,
  })
  @ApiOperation({
    summary: 'This API is responsible for creating an order',
  })
  @ApiResponse({
    status: 201,
    description: 'Order Created successfully',
    example: {
      id: '127a4b15-aff7-41a6-a99c-e121b1a200d3',
      status: 'pending',
      cancellationReason: null,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1234567890',
      notes: 'Please deliver after 5 PM',
      isCanceled: false,
      createdAt: '2025-10-19T18:01:01.390Z',
      updatedAt: '2025-10-19T18:01:01.390Z',
      orderProducts: [
        {
          id: '452d3240-5a7c-4fb7-90ea-9d3d9e83039b',
          orderId: '127a4b15-aff7-41a6-a99c-e121b1a200d3',
          product: {
            id: '38306852-9737-4765-96f6-2b3256880cf7',
            name: 'shampo',
            price: '10.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-11T20:04:22.882Z',
            updatedAt: '2025-10-18T20:07:44.510Z',
          },
          productId: '38306852-9737-4765-96f6-2b3256880cf7',
          createdAt: '2025-10-19T18:01:01.404Z',
          updatedAt: '2025-10-19T18:01:01.404Z',
        },
        {
          id: '6a40be05-71fe-4872-829b-1384842a8b81',
          orderId: '127a4b15-aff7-41a6-a99c-e121b1a200d3',
          product: {
            id: '3fb84105-8d11-4746-b9da-20584cad37e2',
            name: 'burger',
            price: '5.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-17T20:04:29.547Z',
            updatedAt: '2025-10-18T20:07:31.452Z',
          },
          productId: '3fb84105-8d11-4746-b9da-20584cad37e2',
          createdAt: '2025-10-19T18:01:01.410Z',
          updatedAt: '2025-10-19T18:01:01.410Z',
        },
      ],
      totalProducts: 2,
      totalPrice: 15,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongProductIds: {
        summary: 'Validation Error',
        value: {
          message: 'One or more of the provided product IDs are invalid',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async createOrder(@Body() payload: CreateOrderDto): Promise<any> {
    return await this.orderService.createOrder(payload);
  }

  @Get('/')
  @ApiOperation({
    summary:
      'This API is responsible for listing orders with filtering, search, ordering, and pagination',
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
    enum: OrderFields,
    description: 'Field to sort by (default: updatedAt)',
    example: OrderFields.CREATED_AT,
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: SortOrderValues,
    description: 'Sort order (default: ASC)',
    example: SortOrderValues.DESC,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to search across multiple fields',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: OrderStatusValues,
    description: 'Filter by order status',
  })
  @ApiQuery({
    name: 'customerName',
    required: false,
    type: String,
    description: 'Filter by customer name',
  })
  @ApiQuery({
    name: 'customerEmail',
    required: false,
    type: String,
    description: 'Filter by customer email',
  })
  @ApiQuery({
    name: 'customerPhone',
    required: false,
    type: String,
    description: 'Filter by customer phone',
  })
  @ApiQuery({
    name: 'isCanceled',
    required: false,
    type: Boolean,
    description: 'Filter by cancelled status',
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
    description: 'Orders listed successfully with pagination info',
    example: {
      totalFiltersCount: 2,
      orders: [
        {
          id: '08c9bb94-f927-4de6-bdac-d6eb6a2c225c',
          status: 'pending',
          cancellationReason: null,
          customerName: 'John Doe',
          customerEmail: 'john.doe@example.com',
          customerPhone: '+1234567890',
          notes: 'Please deliver after 5 PM',
          isCanceled: false,
          createdAt: '2025-10-19T16:53:47.152Z',
          updatedAt: '2025-10-19T16:53:47.152Z',
          orderProducts: [],
          totalProducts: 0,
          totalPrice: 0,
        },
        {
          id: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
          status: 'pending',
          cancellationReason: null,
          customerName: 'John Doe',
          customerEmail: 'john.doe@example.com',
          customerPhone: '+1234567890',
          notes: 'Please deliver after 5 PM',
          isCanceled: false,
          createdAt: '2025-10-19T17:24:49.878Z',
          updatedAt: '2025-10-19T17:24:49.878Z',
          orderProducts: [
            {
              id: '90b16a6d-aac1-41d6-8b47-6248ff4ff20a',
              orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
              product: {
                id: '38306852-9737-4765-96f6-2b3256880cf7',
                name: 'shampo',
                price: '10.00',
                isActive: true,
                isDeleted: false,
                createdAt: '2025-10-11T20:04:22.882Z',
                updatedAt: '2025-10-18T20:07:44.510Z',
              },
              productId: '38306852-9737-4765-96f6-2b3256880cf7',
              createdAt: '2025-10-19T17:24:49.888Z',
              updatedAt: '2025-10-19T17:24:49.888Z',
            },
            {
              id: '7db9a1f8-c2c5-4bb9-9fa4-2b0427a0ea5d',
              orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
              product: {
                id: '3fb84105-8d11-4746-b9da-20584cad37e2',
                name: 'burger',
                price: '5.00',
                isActive: true,
                isDeleted: false,
                createdAt: '2025-10-17T20:04:29.547Z',
                updatedAt: '2025-10-18T20:07:31.452Z',
              },
              productId: '3fb84105-8d11-4746-b9da-20584cad37e2',
              createdAt: '2025-10-19T17:24:49.892Z',
              updatedAt: '2025-10-19T17:24:49.892Z',
            },
          ],
          totalProducts: 2,
          totalPrice: 15,
        },
      ],
    },
  })
  async listOrders(@Query() queries: ListOrdersDto): Promise<any> {
    return this.orderService.listOrders(queries);
  }

  @Put('/:id')
  @ApiBody({
    type: UpdateOrderDto,
    description: 'Update Order',
    required: true,
  })
  @ApiOperation({
    summary: 'This API is responsible for updating an order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order Updated Successfully',
    example: {
      id: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
      status: 'pending',
      cancellationReason: 'Customer requested cancellation',
      customerName: 'Kevin Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1234567890',
      notes: 'Please deliver after 5 PM',
      isCanceled: false,
      createdAt: '2025-10-19T17:24:49.878Z',
      updatedAt: '2025-10-19T18:05:25.000Z',
      orderProducts: [
        {
          id: '90b16a6d-aac1-41d6-8b47-6248ff4ff20a',
          orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
          product: {
            id: '38306852-9737-4765-96f6-2b3256880cf7',
            name: 'shampo',
            price: '10.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-11T20:04:22.882Z',
            updatedAt: '2025-10-18T20:07:44.510Z',
          },
          productId: '38306852-9737-4765-96f6-2b3256880cf7',
          createdAt: '2025-10-19T17:24:49.888Z',
          updatedAt: '2025-10-19T17:24:49.888Z',
        },
        {
          id: '7db9a1f8-c2c5-4bb9-9fa4-2b0427a0ea5d',
          orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
          product: {
            id: '3fb84105-8d11-4746-b9da-20584cad37e2',
            name: 'burger',
            price: '5.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-17T20:04:29.547Z',
            updatedAt: '2025-10-18T20:07:31.452Z',
          },
          productId: '3fb84105-8d11-4746-b9da-20584cad37e2',
          createdAt: '2025-10-19T17:24:49.892Z',
          updatedAt: '2025-10-19T17:24:49.892Z',
        },
      ],
      totalProducts: 2,
      totalPrice: 15,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongOrderId: {
        summary: 'Order Not Found',
        value: {
          message: 'Order not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      wrongProductIds: {
        summary: 'Validation Error',
        value: {
          message: 'One or more of the provided product IDs are invalid',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async updateOrder(
    @Param('id', UuidValidationPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<any> {
    return await this.orderService.updateOrderById(id, payload);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'This API is responsible for deleting an order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order Deleted Successfully',
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
        summary: 'Order Not Found',
        value: {
          message: 'Order not found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  async deleteOrder(@Param('id', UuidValidationPipe) id: string): Promise<any> {
    return await this.orderService.deleteOrderById(id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'This API is responsible for finding an order by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Order found successfully',
    example: {
      id: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
      status: 'pending',
      cancellationReason: null,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1234567890',
      notes: 'Please deliver after 5 PM',
      isCanceled: false,
      createdAt: '2025-10-19T17:24:49.878Z',
      updatedAt: '2025-10-19T17:24:49.878Z',
      orderProducts: [
        {
          id: '90b16a6d-aac1-41d6-8b47-6248ff4ff20a',
          orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
          product: {
            id: '38306852-9737-4765-96f6-2b3256880cf7',
            name: 'shampo',
            price: '10.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-11T20:04:22.882Z',
            updatedAt: '2025-10-18T20:07:44.510Z',
          },
          productId: '38306852-9737-4765-96f6-2b3256880cf7',
          createdAt: '2025-10-19T17:24:49.888Z',
          updatedAt: '2025-10-19T17:24:49.888Z',
        },
        {
          id: '7db9a1f8-c2c5-4bb9-9fa4-2b0427a0ea5d',
          orderId: '6472634f-7ffb-4eb9-9592-934d20c0fad7',
          product: {
            id: '3fb84105-8d11-4746-b9da-20584cad37e2',
            name: 'burger',
            price: '5.00',
            isActive: true,
            isDeleted: false,
            createdAt: '2025-10-17T20:04:29.547Z',
            updatedAt: '2025-10-18T20:07:31.452Z',
          },
          productId: '3fb84105-8d11-4746-b9da-20584cad37e2',
          createdAt: '2025-10-19T17:24:49.892Z',
          updatedAt: '2025-10-19T17:24:49.892Z',
        },
      ],
      totalProducts: 2,
      totalPrice: 15,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongId: {
        summary: 'Order Not Found',
        value: {
          message: 'Order not found',
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
  async findOrder(@Param('id', UuidValidationPipe) id: string): Promise<any> {
    return await this.orderService.findOrderById(id);
  }

  @Delete('/:id/products')
  @ApiBody({
    type: DeleteOrderProductsDto,
    description: 'Delete Products from Order',
    required: true,
  })
  @ApiOperation({
    summary:
      'This API is responsible for deleting specific products from an order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order products deleted successfully',
    example: {
      raw: [],
      affected: 1,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Errors',
    examples: {
      wrongOrderOrProductIds: {
        summary: 'Either The Order Or The Product Id Is Not Found',
        value: {
          message: 'Either The Order Or The Product Id Is Not Found',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
      invalidProductIds: {
        summary: 'Invalid Product IDs',
        value: {
          message: 'Each product ID must be a valid UUID',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  })
  deleteOrderProducts(
    @Param('id', UuidValidationPipe) id: string,
    @Body() payload: DeleteOrderProductsDto,
  ): Promise<any> {
    return this.orderService.deleteOrderProducts(id, payload);
  }
}
