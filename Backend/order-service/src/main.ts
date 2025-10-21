import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    credentials: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new LoggerInterceptor());

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Order APIs')
    .setDescription('This Collection Contains All The Order APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  if (!port) {
    throw new Error('PORT is not configured or is not a valid number');
  }

  await app.listen(port);
  Logger.log(`Application is running on port ${port}`);
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

void bootstrap();
