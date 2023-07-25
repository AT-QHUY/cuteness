import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshException extends HttpException {
  constructor() {
    super('Refresh', 20402);
  }
}
