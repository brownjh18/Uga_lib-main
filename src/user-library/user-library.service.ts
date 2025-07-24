import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLibrary } from './entities/user-library.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Injectable()
export class UserLibraryService {
  constructor(
    @InjectRepository(UserLibrary)
    private readonly repository: Repository<UserLibrary>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
  ) {}

  async saveBook(userId: string, ebookId: number): Promise<UserLibrary> {
    const user = await this.userRepository.findOne({
      where: { userId }, // ✅ use correct column name (userId instead of id)
    });
    const ebook = await this.ebookRepository.findOne({
      where: { ebookId },
    });

    if (!user || !ebook) {
      throw new NotFoundException('User or Ebook not found');
    }

    const existing = await this.repository.findOne({
      where: { user: { userId }, ebook: { ebookId } },
      relations: ['user', 'ebook'],
    });

    if (existing) return existing; // Prevent duplicate entries

    const entry = this.repository.create({ user, ebook });
    return await this.repository.save(entry);
  }

  async getUserLibrary(userId: string): Promise<UserLibrary[]> {
    return this.repository.find({
      where: { user: { userId } }, // ✅ use userId
      relations: ['ebook'], // Optional: preload ebooks
    });
  }

  async removeFromLibrary(userId: string, ebookId: number): Promise<void> {
    const toDelete = await this.repository.findOne({
      where: {
        user: { userId },
        ebook: { ebookId },
      },
      relations: ['user', 'ebook'],
    });

    if (toDelete) {
      await this.repository.remove(toDelete);
    }
  }
}
