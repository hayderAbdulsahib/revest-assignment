import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { OrderProduct } from '../entities/order_product.entity';

// todo need to add migration

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        charset: 'utf8mb4', // Good for emoji support
        entities: [Order, Product, OrderProduct],
      }),
    }),
  ],
})
export class DatabaseModule {}
