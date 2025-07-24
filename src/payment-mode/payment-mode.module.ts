import { Module } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { PaymentModeController } from './payment-mode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMode } from './entities/payment-mode.entity';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMode, User, Plan])
  ],
  controllers: [PaymentModeController],
  providers: [PaymentModeService],
})
export class PaymentModeModule {}
