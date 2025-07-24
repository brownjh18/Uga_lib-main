import { Module } from '@nestjs/common';
import { ReadingProgressService } from './reading-progress.service';
import { ReadingProgressController } from './reading-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingProgress } from './entities/reading-progress.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadingProgress, User, Ebook])
  ],
  controllers: [ReadingProgressController],
  providers: [ReadingProgressService],
  exports: [ReadingProgressService]
})
export class ReadingProgressModule {}
