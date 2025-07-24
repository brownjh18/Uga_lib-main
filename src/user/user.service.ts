import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from 'src/profile/entities/profile.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    let savedProfile: Profile | undefined;

    if (createDto.profile) {
      const profile = this.profileRepository.create(createDto.profile);
      savedProfile = await this.profileRepository.save(profile);
    }

    const user = this.userRepository.create({
      email: createDto.email,
      password: createDto.password,
      role: createDto.role, // ✅ Directly assign enum value
      profile: savedProfile,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['profile'] }); // role is not a relation now
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['profile'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['profile'],
    });

    if (!user) throw new NotFoundException('User not found');

    // Update role if provided
    if (updateDto.role) {
      user.role = updateDto.role;
    }

    // Update profile if provided
    if (updateDto.profile) {
      if (!user.profile) throw new NotFoundException('User has no profile');
      Object.assign(user.profile, updateDto.profile);
      await this.profileRepository.save(user.profile);
    }

    // Update other fields
    Object.assign(user, updateDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete({ userId: id });
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
