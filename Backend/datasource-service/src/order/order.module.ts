import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderProduct } from 'src/entities/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
