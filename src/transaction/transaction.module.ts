import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { PaymentMode } from 'src/payment-mode/entities/payment-mode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Plan, Subscription, PaymentMode])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
