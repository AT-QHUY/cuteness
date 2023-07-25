import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Category } from 'src/typeorm/entities/category';

@Injectable()
export class HashTagService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategory(key: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        code: Like(`%${key}%`),
      },
    });
  }
}
