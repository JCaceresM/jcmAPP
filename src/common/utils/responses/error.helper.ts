import { HttpException, HttpStatus } from '@nestjs/common';
export type BadRequestType = {
  message?: string;
  body?: Record<string, unknown>;
  status?: number;
};
export const BadRequest = ({
  message = 'error',
  body = {},
  status = HttpStatus.BAD_REQUEST,
}: BadRequestType): HttpException =>
  new HttpException(
    {
      ...body,
      statusCode: status,
      message: message,
    },
    status,
  );

