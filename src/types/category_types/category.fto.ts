import { Expose, Transform } from 'class-transformer';

export class GetCategory {
  @Expose()
  category_id: number;

  @Expose()
  code: string;
}
