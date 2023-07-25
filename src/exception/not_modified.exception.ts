import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableToCreateException extends HttpException {
  constructor() {
    super('Unable To create', HttpStatus.NOT_MODIFIED);
  }
}

export class DuplicateDataException extends HttpException {
  constructor() {
    super('Data already exist', HttpStatus.BAD_REQUEST);
  }
}
