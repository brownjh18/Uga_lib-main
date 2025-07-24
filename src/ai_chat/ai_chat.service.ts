import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatLog } from './entities/ai_chat.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { EbookService } from 'src/ebook/ebook.service';
import { ReadingProgressService } from 'src/reading-progress/reading-progress.service';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { ReviewService } from 'src/review/review.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class AiChatService {
  constructor(
    @InjectRepository(ChatLog) private repo: Repository<ChatLog>,
    private readonly userService: UserService,
    private readonly ebookService: EbookService,
    private readonly readingProgressService: ReadingProgressService,
    private readonly bookmarkService: BookmarkService,
    private readonly reviewService: ReviewService,
    private readonly subscriptionService: SubscriptionService,
    private readonly transactionService: TransactionService,
  ) {}

  async chat(userId: string, message: string): Promise<string> {
    const aiResponse = await this.generateAiResponse(userId, message);

    const log = this.repo.create({ userId, userMessage: message, aiResponse });
    await this.repo.save(log);

    return aiResponse;
  }

  async getUserChatLogs(userId: string) {
    return await this.repo.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });
  }

  private async generateAiResponse(userId: string, message: string): Promise<string> {
    const msg = message.toLowerCase();

    if (msg.includes('progress')) {
      return this.handleReadingProgress(userId);
    }

    if (msg.includes('bookmark')) {
      return this.handleBookmarks(userId);
    }

    if (msg.includes('review')) {
      return this.handleReviews(userId);
    }

    if (msg.includes('subscription')) {
      return this.handleSubscriptions(userId);
    }

    if (msg.includes('payment') || msg.includes('transaction')) {
      return this.handleTransactions(userId);
    }

    if (msg.includes('recommend')) {
      return this.handleRecommendations(userId);
    }

    return `Sorry, I didn't understand your request. You can ask about your progress, bookmarks, reviews, subscriptions, payments, or recommendations.`;
  }

  private async handleReadingProgress(userId: string): Promise<string> {
    const progresses = await this.readingProgressService.findByUser(userId);
    if (!progresses.length) return "You have no reading progress yet.";

    return progresses
      .map(p => 
        `Book "${p.ebook.title}": Currently on page ${p.currentPage} — ${p.progressPercentage.toFixed(1)}% completed.`
      )
      .join('\n');
  }

  private async handleBookmarks(userId: string): Promise<string> {
    const bookmarks = await this.bookmarkService.findByUser(userId);
    if (!bookmarks.length) return "You have no bookmarks.";

    return bookmarks
      .map(b => `Book "${b.ebook.title}" bookmarked at page ${b.pageNumber}.`)
      .join('\n');
  }

  private async handleReviews(userId: string): Promise<string> {
    const reviews = await this.reviewService.findByUser(userId);
    if (!reviews.length) return "You have not submitted any reviews yet.";

    return reviews
      .map(r => `Review for "${r.ebook.title}": Rating ${r.rating}, Comment: ${r.comment}`)
      .join('\n');
  }

  private async handleSubscriptions(userId: string): Promise<string> {
    const subscriptions = await this.subscriptionService.findByUser(userId);
    if (!subscriptions.length) return "You have no active subscriptions.";

    return subscriptions
      .map(s => `Subscription to plan "${s.plan.name}" is active until ${s.endDate.toDateString()}.`)
      .join('\n');
  }

  private async handleTransactions(userId: string): Promise<string> {
    const transactions = await this.transactionService.findByUser(userId);
    if (!transactions.length) return "You have no transaction records.";

    return transactions
      .map(t => `Transaction on ${t.transactionDate.toDateString()}: Amount ${t.amount} - Status: ${t.status}`)
      .join('\n');
  }

  private async handleRecommendations(userId: string): Promise<string> {
    // This is a placeholder. You could do personalized recommendations here.
    return "I recommend 'Understanding Physics' and 'Introduction to Biology'.";
  }
}
