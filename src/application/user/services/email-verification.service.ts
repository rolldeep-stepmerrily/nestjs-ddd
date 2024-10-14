import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { RedisService } from 'src/infrastructure/redis/redis.service';
import { EmailService } from 'src/infrastructure/email/email.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly redisService: RedisService,
  ) {}

  generateVerificationCode(): string {
    return `${Math.floor(Math.random() * 1000000)}`.padStart(6, '0');
  }

  async requestEmailVerification(email: string): Promise<void> {
    const verificationCode = this.generateVerificationCode();

    await this.redisService.setEmailVerificationData(email, verificationCode);

    await this.emailService.sendVerificationEmail(email, verificationCode);
  }

  async compareAndCompleteEmailVerificaiton(email: string, verificationCode: string): Promise<void> {
    const verificationData = await this.redisService.getEmailVerificationData(email);

    if (!verificationData) {
      throw new NotFoundException('인증 데이터가 존재하지 않습니다.');
    }

    if (verificationData.verificationCode !== verificationCode) {
      throw new UnauthorizedException('인증 코드가 일치하지 않습니다.');
    }

    if (verificationData.isComplete) {
      throw new ConflictException('이미 인증이 완료된 이메일입니다.');
    }

    await this.redisService.completeEmailVerification(email);
  }
}
