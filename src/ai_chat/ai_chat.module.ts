import { Module } from '@nestjs/common';
import { AiChatService } from './ai_chat.service';
import { AiChatController } from './ai_chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatLog } from './entities/ai_chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Ebook } from 'src/ebook/entities/ebook.entity';
import { ReadingProgress } from 'src/reading-progress/entities/reading-progress.entity';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Review } from 'src/review/entities/review.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { UserModule } from 'src/user/user.module';
import { EbookModule } from 'src/ebook/ebook.module';
import { ReadingProgressModule } from 'src/reading-progress/reading-progress.module';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
import { ReviewModule } from 'src/review/review.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatLog, User, Ebook, ReadingProgress, Bookmark, Review, Subscription, Transaction]),
    UserModule,
    EbookModule,
    ReadingProgressModule,
    BookmarkModule,
    ReviewModule,
    SubscriptionModule,
    TransactionModule
  ],
  controllers: [AiChatController],
  providers: [AiChatService],
})
export class AiChatModule {}
