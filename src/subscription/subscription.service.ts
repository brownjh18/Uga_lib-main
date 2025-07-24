import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
  ) {}

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    const user = await this.userRepository.findOneBy({ userId: String(dto.userId) });
    const plan = await this.planRepository.findOneBy({ planId: dto.planId });

    if (!user) throw new Error('User not found');
    if (!plan) throw new Error('Plan not found');

    const sub = new Subscription();
    sub.user = user;
    sub.plan = plan;
    sub.startDate = dto.startDate;
    sub.endDate = dto.endDate;

    return this.subscriptionRepository.save(sub);
  }


  findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ relations: ['user', 'plan'] });
  }

  findOne(id: number) {
    return this.subscriptionRepository.findOne({ where: { subscriptionId: id } });
  }

  async findByUser(userId: string) {
    return this.subscriptionRepository.find({
      where: { user: { userId } },
      relations: ['plan'],
    });
  }


  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionRepository.update(id, updateSubscriptionDto);
  }

  remove(id: number) {
    return this.subscriptionRepository.delete(id);
  }
}
