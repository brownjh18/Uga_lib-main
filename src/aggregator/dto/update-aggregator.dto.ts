import { PartialType } from '@nestjs/mapped-types';
import { CreateAggregatorDto } from './create-aggregator.dto';

export class UpdateAggregatorDto extends PartialType(CreateAggregatorDto) {}
