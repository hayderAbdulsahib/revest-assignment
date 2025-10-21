import { BadRequestException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';

import {
  Response,
  ParsedResponse,
} from '../../grpc/interfaces/product.interface';
import { ErrorObject } from '../../grpc/interfaces/error.interface';

export const validateGrpcResponse = (response: Response): ParsedResponse => {
  if (response.isError) {
    throw new BadRequestException(
      response.message || 'something went wrong while making the gRPC call',
    );
  }

  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data);
  }

  return response;
};

// Generic method to handle any gRPC call
export const callGrpcService = async <T>(
  grpcCall: () => Observable<T>,
): Promise<T> => {
  try {
    const response = await firstValueFrom(
      grpcCall() as unknown as Observable<T>,
    );

    const validatedResponse = validateGrpcResponse(response as Response);
    return validatedResponse as T;
  } catch (error) {
    const err = error as ErrorObject;
    throw new BadRequestException(err.message);
  }
};
