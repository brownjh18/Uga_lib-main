import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepositoy: Repository<Profile>,
  ) {}

  createOne(dto: CreateProfileDto) {
    const profile = this.profileRepositoy.create(dto);
    return this.profileRepositoy.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepositoy.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepositoy.findOne({
      where: { profileId: id },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepositoy.findOne({ where: { profileId: id } });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    Object.assign(profile, updateProfileDto);
    return this.profileRepositoy.save(profile);
  }

  async remove(id: number): Promise<void> {
    const result = await this.profileRepositoy.delete({ profileId: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }
}
