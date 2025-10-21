import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
