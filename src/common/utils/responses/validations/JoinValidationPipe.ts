import { Injectable, PipeTransform } from '@nestjs/common';
import { ArraySchema, ObjectSchema } from 'joi';
import { BadRequest } from '../error.helper';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | ArraySchema) {}

  transform<T>(value: T): T {
    const { error } = this.schema.validate(value);
    const message = error?.message;

    if (error) {
      throw BadRequest({ message });
    }
    return value;
  }
}
