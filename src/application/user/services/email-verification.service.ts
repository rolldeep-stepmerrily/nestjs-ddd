import { Injectable } from '@nestjs/common';

import { RedisService } from 'src/infrastructure/cache/redis/redis.service';
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

    await this.redisService.set(`users/email-verification/request:${email}`, verificationCode);

    await this.emailService.sendVerificationEmail(email, verificationCode);
  }
}
