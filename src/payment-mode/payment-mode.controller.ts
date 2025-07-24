import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { CreatePaymentModeDto } from './dto/create-payment-mode.dto';
import { UpdatePaymentModeDto } from './dto/update-payment-mode.dto';

@Controller('payment-mode')
export class PaymentModeController {
  constructor(private readonly paymentModeService: PaymentModeService) {}

  @Post()
  create(@Body() dto: CreatePaymentModeDto) {
    return this.paymentModeService.create(dto);
  }

  @Get()
  findAll() {
    return this.paymentModeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentModeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentModeDto: UpdatePaymentModeDto) {
    return this.paymentModeService.update(+id, updatePaymentModeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentModeService.remove(+id);
  }
}
