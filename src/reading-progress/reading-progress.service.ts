// src/reading-progress/reading-progress.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingProgress } from './entities/reading-progress.entity';
import { CreateReadingProgressDto } from './dto/create-reading-progress.dto';
import { UpdateReadingProgressDto } from './dto/update-reading-progress.dto';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Injectable()
export class ReadingProgressService {
  constructor(
    @InjectRepository(ReadingProgress) private readonly repository: Repository<ReadingProgress>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ebook) private readonly ebookRepository: Repository<Ebook>,
  ) {}

  async create(dto: CreateReadingProgressDto): Promise<ReadingProgress> {
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const ebook = await this.ebookRepository.findOneBy({ ebookId: dto.ebookId });

    if (!user || !ebook) throw new NotFoundException('User or Ebook not found');

    const progress = this.repository.create({ ...dto, user, ebook });
    return this.repository.save(progress);
  }

  findAll() {
    return this.repository.find({ relations: ['user', 'ebook'] });
  }

  async findOne(id: number): Promise<ReadingProgress> {
    const progress = await this.repository.findOne({ where: { id } });
    if (!progress) {
      throw new NotFoundException(`ReadingProgress with ID ${id} not found`);
    }
    return progress;
  }

  async findByUser(userId: string) {
    return this.repository.find({
      where: { user: { userId } },
      relations: ['ebook'],
    });
  }

  async update(id: number, dto: UpdateReadingProgressDto) {
    const progress = await this.findOne(id);
    if (!progress) {
      throw new NotFoundException(`ReadingProgress with ID ${id} not found`);
    }

    Object.assign(progress, dto);
    return this.repository.save(progress);
  }

  async remove(id: number) {
    const progress = await this.findOne(id);
    if (!progress) {
      throw new NotFoundException(`ReadingProgress with ID ${id} not found`);
    }

    return this.repository.remove(progress);
  }

}
