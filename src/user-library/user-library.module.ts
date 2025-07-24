import { Module } from '@nestjs/common';
import { UserLibraryService } from './user-library.service';
import { UserLibraryController } from './user-library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLibrary } from './entities/user-library.entity';
import { EbookModule } from 'src/ebook/ebook.module';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLibrary, User, Ebook]), EbookModule],
  controllers: [UserLibraryController],
  providers: [UserLibraryService],
})
export class UserLibraryModule {}
