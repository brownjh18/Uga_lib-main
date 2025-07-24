import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Aggregator } from 'src/aggregator/entities/aggregator.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class EbookService {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,

    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,

    @InjectRepository(Aggregator)
    private readonly aggregatorRepository: Repository<Aggregator>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateEbookDto): Promise<Ebook> {
    const author = await this.authorRepository.findOneBy({ authorId: dto.authorId });
    const publisher = await this.publisherRepository.findOneBy({ publisherId: dto.publisherId });
    const aggregator = await this.aggregatorRepository.findOneBy({ aggregatorId: dto.aggregatorId });
    const category = await this.categoryRepository.findOneBy({ categoryId: dto.categoryId });

    if (!author) throw new NotFoundException('Author not found');
    if (!publisher) throw new NotFoundException('Publisher not found');
    if (!aggregator) throw new NotFoundException('Aggregator not found');
    if (!category) throw new NotFoundException('Category not found');

    const ebook = this.ebookRepository.create({
      title: dto.title,
      description: dto.description,
      fileUrl: dto.fileUrl,
      // publicationDate: dto.publicationDate,
      author,
      publisher,
      aggregator,
      category,
    });

    return this.ebookRepository.save(ebook);
  }

  findAll(): Promise<Ebook[]> {
    return this.ebookRepository.find({
      relations: ['author', 'publisher', 'aggregator', 'category'],
    });
  }

  async findOne(id: number): Promise<Ebook> {
    const ebook = await this.ebookRepository.findOne({
      where: { ebookId: id },
      relations: ['author', 'publisher', 'aggregator', 'category'],
    });

    if (!ebook) {
      throw new NotFoundException(`Ebook with ID ${id} not found`);
    }

    return ebook;
  }

  async update(id: number, dto: UpdateEbookDto): Promise<Ebook> {
    const ebook = await this.ebookRepository.findOneBy({ ebookId: id });
    if (!ebook) throw new NotFoundException('Ebook not found');

    if (dto.authorId) {
      const author = await this.authorRepository.findOneBy({ authorId: dto.authorId });
      if (!author) throw new NotFoundException('Author not found');
      ebook.author = author;
    }

    if (dto.publisherId) {
      const publisher = await this.publisherRepository.findOneBy({ publisherId: dto.publisherId });
      if (!publisher) throw new NotFoundException('Publisher not found');
      ebook.publisher = publisher;
    }

    if (dto.aggregatorId) {
      const aggregator = await this.aggregatorRepository.findOneBy({ aggregatorId: dto.aggregatorId });
      if (!aggregator) throw new NotFoundException('Aggregator not found');
      ebook.aggregator = aggregator;
    }

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ categoryId: dto.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      ebook.category = category;
    }

    Object.assign(ebook, dto);
    return this.ebookRepository.save(ebook);
  }

  async remove(id: number): Promise<void> {
    await this.ebookRepository.delete(id);
  }
}
