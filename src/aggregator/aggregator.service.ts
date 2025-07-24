import { Injectable } from '@nestjs/common';
import { CreateAggregatorDto } from './dto/create-aggregator.dto';
import { UpdateAggregatorDto } from './dto/update-aggregator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aggregator } from './entities/aggregator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AggregatorService {
  constructor(
    @InjectRepository(Aggregator) private readonly aggregatorRepository: Repository<Aggregator>
  ) {}

  create(createAggregatorDto: CreateAggregatorDto) {
    const aggregator = this.aggregatorRepository.create(createAggregatorDto);
    return this.aggregatorRepository.save(aggregator);  
  }

  findAll() {
    return this.aggregatorRepository.find();
  }

  findOne(id: number) {
    return this.aggregatorRepository.findOne({ where: { aggregatorId: id } });
  }

  update(id: number, updateAggregatorDto: UpdateAggregatorDto) {
    return this.aggregatorRepository.update(id, updateAggregatorDto);
  }

  remove(id: number) {
    return this.aggregatorRepository.delete(id);
  }
}
