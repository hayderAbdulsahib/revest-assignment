import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GrpcClientService } from './datasource-service/grpc-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_PACKAGE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'order',
            protoPath: join(__dirname, '../../src/grpc/proto/order.proto'),
            url: configService.get<string>('GRPC_DATASOURCE_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [GrpcClientService],
  exports: [GrpcClientService],
})
export class GrpcModule {}
