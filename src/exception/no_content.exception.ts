import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Not found', HttpStatus.NO_CONTENT);
  }
}
