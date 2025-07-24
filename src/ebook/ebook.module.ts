import { Module } from '@nestjs/common';
import { EbookService } from './ebook.service';
import { EbookController } from './ebook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { Author } from 'src/author/entities/author.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Aggregator } from 'src/aggregator/entities/aggregator.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ebook, Author, Publisher, Aggregator, Category])
  ],
  controllers: [EbookController],
  providers: [EbookService],
})
export class EbookModule {}
