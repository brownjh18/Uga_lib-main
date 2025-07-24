import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark, User, Ebook])
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkModule {}
