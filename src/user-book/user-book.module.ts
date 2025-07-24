import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './entities/user-book.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBook, User, Ebook])
  ],
  controllers: [UserBookController],
  providers: [UserBookService],
})
export class UserBookModule {}
