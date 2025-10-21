import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
