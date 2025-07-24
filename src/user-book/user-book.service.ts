import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBook } from './entities/user-book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
  ) {}

  async create(dto: CreateUserBookDto): Promise<UserBook> {
    const user = await this.userRepository.findOneBy({ userId: String(dto.userId) });
    if (!user) throw new NotFoundException('User not found');

    const ebook = await this.ebookRepository.findOneBy({ ebookId: dto.ebookId });
    if (!ebook) throw new NotFoundException('Ebook not found');

    const userBook = this.userBookRepository.create({
      user,
      ebook,
      isDownloaded: dto.isDownloaded ?? false,
      isViewed: dto.isViewed ?? true,
    });

    return this.userBookRepository.save(userBook);
  }

  async findAll(): Promise<UserBook[]> {
    return this.userBookRepository.find({ relations: ['user', 'ebook'] });
  }

  async findOne(id: number): Promise<UserBook> {
    const record = await this.userBookRepository.findOne({
      where: { userBookId: id },
      relations: ['user', 'ebook'],
    });

    if (!record) throw new NotFoundException('UserBook not found');
    return record;
  }

  async update(id: number, updateDto: UpdateUserBookDto): Promise<UserBook> {
    const userBook = await this.userBookRepository.findOneBy({userBookId: id });
    if (!userBook) throw new NotFoundException('UserBook not found');

    Object.assign(userBook, updateDto);
    return this.userBookRepository.save(userBook);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userBookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('UserBook not found');
    }
  }
}
