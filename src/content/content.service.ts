import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private readonly contentRepository: Repository<Content>
  ) {}

  async createOne(dto: CreateContentDto) {
    const content = this.contentRepository.create(dto);
    return this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({ relations: ['ebook'] }); // Add relations if needed
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { contentId: id },
      relations: ['ebook'] // Add if needed
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto): Promise<Content> {
    const content = await this.contentRepository.preload({
      contentId: id,
      ...updateContentDto,
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return this.contentRepository.save(content);
  }

  async remove(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }
}
