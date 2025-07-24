import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      return await this.reviewService.create(createReviewDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to submit review',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('user/:userId')
  async createForUser(
    @Param('userId') userId: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    try {
      createReviewDto.userId = userId;
      return await this.reviewService.create(createReviewDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to submit review for user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('ebook/:ebookId')
  async findByEbook(@Param('ebookId') ebookId: number): Promise<Review[]> {
    try {
      return await this.reviewService.findByEbook(ebookId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch reviews',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Review> {
    const review = await this.reviewService.findOne(id);
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateReviewDto,
  ): Promise<Review> {
    try {
      return await this.reviewService.update(id, updateDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update review',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.reviewService.remove(id);
      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete review',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
