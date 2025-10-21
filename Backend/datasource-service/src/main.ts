import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const productGrpcUrl = configService.get<string>('PRODUCT_GRPC_SERVER_URL');
  const orderGrpcUrl = configService.get<string>('ORDER_GRPC_SERVER_URL');

  if (!port) {
    throw new Error('PORT is not configured');
  }

  if (!productGrpcUrl) {
    throw new Error('PRODUCT_GRPC_SERVER_URL is not configured');
  }

  if (!orderGrpcUrl) {
    throw new Error('ORDER_GRPC_SERVER_URL is not configured');
  }

  // Configure gRPC microservice for products
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../src/proto/product.proto'),
      url: productGrpcUrl,
    },
  });

  // Configure gRPC microservice for orders
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: join(__dirname, '../src/proto/order.proto'),
      url: orderGrpcUrl,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`Application is running on port ${port}`);
  Logger.log(`Product gRPC server is running on url ${productGrpcUrl}`);
  Logger.log(`Order gRPC server is running on url ${orderGrpcUrl}`);
}

process.on('unhandledRejection', (error: Error) => {
  const logger = new Logger('UnhandledRejection');
  logger.error({
    type: 'UnhandledRejection',
    message: error.message,
    timestamp: new Date().toISOString(),
  });
});

process.on('uncaughtException', (error: Error) => {
  const logger = new Logger('UncaughtException');
  logger.error({
    type: 'UncaughtException',
    message: error.message,
    timestamp: new Date().toISOString(),
  });
});

// Seed function to run seeding from CLI
async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.runSeed();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

// Check if seed command is passed
if (process.argv.includes('seed')) {
  runSeed();
} else {
  bootstrap();
}
