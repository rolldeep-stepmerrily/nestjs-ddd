import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { CreateUserDto } from 'src/application/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const { password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    return await this.userRepository.createUser(user);
  }

  async findUserById(userId: number) {
    return await this.userRepository.findUserById(userId);
  }
}
