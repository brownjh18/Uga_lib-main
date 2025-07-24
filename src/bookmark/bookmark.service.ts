import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark) private readonly repository: Repository<Bookmark>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ebook) private readonly ebookRepository: Repository<Ebook>,
  ) {}

  async create(dto: CreateBookmarkDto): Promise<Bookmark> {
    const user = await this.userRepository.findOneBy({ userId: dto.userId });
    const ebook = await this.ebookRepository.findOneBy({ ebookId: dto.ebookId });

    if (!user || !ebook) throw new NotFoundException('User or Ebook not found');

    const bookmark = this.repository.create({ ...dto, user, ebook });
    return this.repository.save(bookmark);
  }

  findAll() {
    return this.repository.find({ relations: ['user', 'ebook'] });
  }

  async findOne(id: number): Promise<Bookmark> {
    const bookmark = await this.repository.findOne({
      where: { bookmarkId: id },
      relations: ['user', 'ebook'],
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }

    return bookmark;
  }

  async update(id: number, dto: UpdateBookmarkDto) {
    const bookmark = await this.findOne(id);
    Object.assign(bookmark, dto);
    return this.repository.save(bookmark);
  }

  async remove(id: number) {
    const bookmark = await this.findOne(id);
    return this.repository.remove(bookmark);
  }
}
