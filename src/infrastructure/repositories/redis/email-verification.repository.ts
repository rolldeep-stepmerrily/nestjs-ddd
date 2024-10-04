import { Injectable, NotFoundException } from '@nestjs/common';

import { RedisService } from 'src/infrastructure/database/redis/redis.service';

interface IEmailVerification {
  email: string;
  code: string;
  count: number;
  isComplete: boolean;
}

@Injectable()
export class EmailVerificationRepository {
  constructor(private readonly redisService: RedisService) {}

  async getVerification(email: string): Promise<IEmailVerification | null> {
    return await this.redisService.get<IEmailVerification>(`email-verification/${email}`);
  }

  async setVerification(email: string, code: string): Promise<void> {
    const verification = await this.getVerification(email);

    const value: IEmailVerification = {
      email,
      code,
      count: verification?.count ? verification.count + 1 : 1,
      isComplete: false,
    };

    await this.redisService.set(`email-verification/${email}`, value);
  }

  async completeVerification(email: string): Promise<void> {
    const verification = await this.getVerification(email);

    if (!verification) {
      throw new NotFoundException('인증 정보를 찾을 수 없습니다.');
    }

    verification.isComplete = true;

    await this.redisService.set(`email-verification/${email}`, verification);
  }

  async deleteVerification(email: string): Promise<void> {
    await this.redisService.delete(`email-verification/${email}`);
  }
}
