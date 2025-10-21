import { StandardResponse } from '../../interfaces/response/standardResponse.interface';

export class ResponseHelper {
  /**
   * Creates a success response with the standard format
   * @param data - The data to return
   * @param message - Optional success message (defaults to 'success')
   * @returns StandardResponse with isError: false
   */
  static success(data: unknown, message: string = 'success'): StandardResponse {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    } else {
      data = JSON.stringify({ data });
    }

    return {
      isError: false,
      message,
      data: data as string,
    };
  }

  /**
   * Creates an error response with the standard format
   * @param message - Error message
   * @returns StandardResponse with isError: true
   */
  static error(message: string): StandardResponse {
    return {
      isError: true,
      message,
      data: '{}',
    };
  }
}
