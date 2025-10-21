import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';
import { OrderProduct } from 'src/entities/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderProduct])],
  providers: [SeedService],
  exports: [SeedService], // Export so it can be used in CLI commands
})
export class SeedModule {}
