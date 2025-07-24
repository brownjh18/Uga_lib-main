import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ebook) private readonly ebookRepository: Repository<Ebook>
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { userId: dto.userId } });
    const ebook = await this.ebookRepository.findOne({ where: { ebookId: dto.ebookId } });

    if (!user || !ebook) {
      throw new Error('User or Ebook not found');
    }

    const review = this.reviewRepository.create({
      rating: dto.rating,
      comment: dto.comment,
      // userId: dto.userId,
      // ebookId: dto.ebookId,
      user,     // this sets userUserId
      ebook     // this sets ebookEbookId
    });

    return await this.reviewRepository.save(review);
  }

  async findByEbook(ebookId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { ebook: { ebookId } },
      relations: ['user', 'ebook'],
    });
  }

  async findByUser(userId: string) {
    return this.reviewRepository.find({
      where: { user: { userId } },
      relations: ['ebook'],
    });
  }


  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { reviewId: id },
      relations: ['user', 'ebook'],
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return await this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }
}
