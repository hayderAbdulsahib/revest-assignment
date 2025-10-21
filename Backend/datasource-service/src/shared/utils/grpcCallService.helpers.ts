import { Logger } from '@nestjs/common';
import { ErrorObject } from '../../interfaces/error/error.interface';
import { ResponseHelper } from '../../shared/utils/response.helper';

// Generic method to handle any gRPC server call with custom message
export const callGrpcService = async <T>({
  grpcCall,
  logger,
  controllerName,
}: {
  grpcCall: () => Promise<T>;
  logger: Logger;
  controllerName?: string;
}): Promise<T> => {
  const startTime = Date.now();

  try {
    const response = await grpcCall();
    const executionTime = Date.now() - startTime;
    logger.log(
      `gRPC ${controllerName} controller successfully executed in ${executionTime}ms`,
    );

    return ResponseHelper.success(
      response,
      `gRPC ${controllerName} controller successfully executed`,
    ) as T;
  } catch (err) {
    const executionTime = Date.now() - startTime;
    const error = err as ErrorObject;

    logger.error(
      `gRPC ${controllerName} controller failed after ${executionTime}ms with error message: ${error.message}`,
      error,
    );

    return ResponseHelper.error(error.message) as T;
  }
};
