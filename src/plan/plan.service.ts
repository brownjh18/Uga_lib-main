import { Inject, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>
  ) {}

  create(dto: CreatePlanDto) {
    const plan = this.planRepository.create(dto);
    return this.planRepository.save(plan);
  }

  findAll() {
    return this.planRepository.find();
  }

  findOne(id: number) {
    return this.planRepository.findOne({ where: { planId: id } });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.planRepository.update(id, updatePlanDto);
  }

  remove(id: number) {
    return this.planRepository.delete(id);
  }
}
