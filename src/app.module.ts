import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PaymentModeModule } from './payment-mode/payment-mode.module';
import { AggregatorModule } from './aggregator/aggregator.module';
import { PlanModule } from './plan/plan.module';
import { TransactionModule } from './transaction/transaction.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { RoleModule } from './role/role.module';
import { EbookModule } from './ebook/ebook.module';
import { CategoryModule } from './category/category.module';
import { ContentModule } from './content/content.module';
import { UserBookModule } from './user-book/user-book.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { Aggregator } from './aggregator/entities/aggregator.entity';
import { Author } from './author/entities/author.entity';
import { Category } from './category/entities/category.entity';
import { Content } from './content/entities/content.entity';
import { Ebook } from './ebook/entities/ebook.entity';
import { PaymentMode } from './payment-mode/entities/payment-mode.entity';
import { Plan } from './plan/entities/plan.entity';
import { Profile } from './profile/entities/profile.entity';
import { Publisher } from './publisher/entities/publisher.entity';
import { Role } from './role/entities/role.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { User } from './user/entities/user.entity';
import { UserBook } from './user-book/entities/user-book.entity';
import { Transaction } from './transaction/entities/transaction.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entities/review.entity';
import { ReadingProgressModule } from './reading-progress/reading-progress.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ReadingProgress } from './reading-progress/entities/reading-progress.entity';
import { Bookmark } from './bookmark/entities/bookmark.entity';
import { AiChatModule } from './ai_chat/ai_chat.module';
import { ChatLog } from './ai_chat/entities/ai_chat.entity';
import { UserLibraryModule } from './user-library/user-library.module';
import { UserLibrary } from './user-library/entities/user-library.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Jonah@2002',
      database: 'uga_lib',
      entities: [
        Aggregator, 
        Author, 
        Category, 
        Content, 
        Ebook, 
        PaymentMode, 
        Plan, 
        Profile, 
        Publisher, 
        Role, 
        Subscription,  
        User, 
        UserBook,
        Transaction,
        Review,
        ReadingProgress,
        Bookmark,
        ChatLog,
        UserLibrary,
        Auth
      ],
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Make config available globally
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    PaymentModeModule,
    AggregatorModule,
    PlanModule,
    TransactionModule,
    SubscriptionModule,
    RoleModule,
    EbookModule,
    CategoryModule,
    ContentModule,
    UserBookModule,
    AuthorModule,
    PublisherModule,
    ReviewModule,
    ReadingProgressModule,
    BookmarkModule,
    AiChatModule,
    UserLibraryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
