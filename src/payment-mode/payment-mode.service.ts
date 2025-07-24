import { Injectable } from '@nestjs/common';
import { CreatePaymentModeDto } from './dto/create-payment-mode.dto';
import { UpdatePaymentModeDto } from './dto/update-payment-mode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMode } from './entities/payment-mode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentModeService {
  constructor(
    @InjectRepository(PaymentMode) private readonly paymentModeRepository: Repository<PaymentMode>
  ) {}

  create(dto: CreatePaymentModeDto) {
    const paymentMode = this.paymentModeRepository.create(dto);
    return this.paymentModeRepository.save(paymentMode);
  }

  findAll() {
    return this.paymentModeRepository.find();
  }

  findOne(id: number) {
    return this.paymentModeRepository.findOne({ where: { paymentModeId: id } });
  }

  update(id: number, updatePaymentModeDto: UpdatePaymentModeDto) {
    return this.paymentModeRepository.update(id, updatePaymentModeDto);
  }

  remove(id: number) {
    return this.paymentModeRepository.delete(id);
  }
}
