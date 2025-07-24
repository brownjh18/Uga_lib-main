import { PaymentMode } from "src/payment-mode/entities/payment-mode.entity";
import { Subscription } from "src/subscription/entities/subscription.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  @ManyToOne(() => User, user => user.transactions, { nullable: true })
  user: User;

  @ManyToOne(() => Subscription, sub => sub.transactions, { nullable: true })
  subscription: Subscription;

  @ManyToOne(() => PaymentMode, mode => mode.transactions, { nullable: true })
  paymentMode: PaymentMode;
}
