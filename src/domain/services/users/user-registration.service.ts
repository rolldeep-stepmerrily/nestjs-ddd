import { ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UserRepository } from 'src/infrastructure/repositories/prisma';
import { UserVerificationService } from './user-verification.service';
import { CreateUserDto } from 'src/application/dto/user.dto';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userVerificationService: UserVerificationService,
  ) {}

  async checkEmail(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isComplete = await this.userVerificationService.isVerificationComplete(email);

    if (!isComplete) {
      throw new Error('이메일 인증이 완료되지 않았습니다.');
    }

    await Promise.all([this.checkEmail(email), this.userVerificationService.deleteVerification(email)]);

    const hashedPassword = await bcrypt.hash(password, 10);

    createUserDto.password = hashedPassword;

    return await this.userRepository.createUser(createUserDto);
  }
}
