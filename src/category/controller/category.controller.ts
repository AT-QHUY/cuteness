import { Controller, Get } from '@nestjs/common';
import { GetCategory } from 'src/types/category_types/category.fto';
import { CategoryService } from '../service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<GetCategory[]> {
    return this.categoryService.getAllCategory();
  }
}
