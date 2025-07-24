import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Profile])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
