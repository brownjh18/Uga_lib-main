import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Ebook])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
