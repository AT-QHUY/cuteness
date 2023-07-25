import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/exception/no_content.exception';
import { Category } from 'src/typeorm/entities/category';
import { GetCategory } from 'src/types/category_types/category.fto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategory(): Promise<GetCategory[]> {
    const categories: Category[] = await this.categoryRepository.find();

    if (categories.length == 0) throw new NotFoundException();

    const tmpCategies = categories.map((post) =>
      plainToInstance(GetCategory, post, {
        excludeExtraneousValues: true,
      }),
    );

    return tmpCategies;
  }

  async getOneById(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: {
        category_id: id,
      },
    });

    if (category) {
      return category;
    }

    throw new NotFoundException();
  }

  async getById(ids: number[]): Promise<Category[]> {
    var categories: Category[] = await Promise.all(
      ids.map(async (id) => {
        return await this.getOneById(id);
      }),
    );

    return categories;
  }
}
