// uuid-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IsUUID, validate } from 'class-validator';

class UuidValidationDto {
  @IsUUID()
  value: string;
}

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  async transform(value: string) {
    const validationObject = new UuidValidationDto();
    validationObject.value = value;

    const errors = await validate(validationObject);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid UUID format');
    }

    return value;
  }
}
