import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { PaymentMode } from 'src/payment-mode/entities/payment-mode.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Subscription) private subRepository: Repository<Subscription>,
    @InjectRepository(PaymentMode) private paymentmodeRepository: Repository<PaymentMode>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const user = await this.userRepository.findOneBy({ userId: String(dto.userId) });
    const subscription = await this.subRepository.findOneBy({ subscriptionId: dto.subscriptionId });
    const paymentMode = await this.paymentmodeRepository.findOneBy({ paymentModeId: dto.paymentModeId });

    if (!user) throw new NotFoundException('User not found');
    if (!subscription) throw new NotFoundException('Subscription not found');
    if (!paymentMode) throw new NotFoundException('Payment mode not found');

    const transaction = new Transaction();
    transaction.user = user;
    transaction.subscription = subscription;
    transaction.paymentMode = paymentMode;
    transaction.amount = dto.amount;
    transaction.transactionDate = dto.transactionDate;

    return this.transactionRepository.save(transaction);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: ['user', 'subscription', 'paymentMode'],
    });
  }

  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionId: id },
      relations: ['user', 'subscription', 'paymentMode'],
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async findByUser(userId: string) {
    return this.transactionRepository.find({
      where: { user: { userId } },
    });
  }


  async update(id: number, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionRepository.preload({
      transactionId: id,
      ...dto,
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.transactionRepository.save(transaction);
  }

  async remove(id: number): Promise<void> {
    const result = await this.transactionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }
}
