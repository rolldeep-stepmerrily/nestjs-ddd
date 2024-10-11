import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RedisRepository } from './repositories/redis.repository';

interface IEmailVerification {
  email: string;
  verificationCode: string;
  count: number;
  isComplete: boolean;
}

@Injectable()
export class RedisService {
  private readonly EMAIL_VERIFICATION_ENDPOINT = 'api/users/email-verification/request';
  private readonly MAX_EMAIL_VERIFICATION_COUNT = 5;

  constructor(private readonly redisRepository: RedisRepository) {}

  async getEmailVerificationData(email: string): Promise<IEmailVerification | null> {
    return await this.redisRepository.get<IEmailVerification>(`${this.EMAIL_VERIFICATION_ENDPOINT}:${email}`);
  }

  async setEmailVerificationData(email: string, verificationCode: string): Promise<void> {
    const verificationData = await this.getEmailVerificationData(email);

    if (verificationData && verificationData.count >= this.MAX_EMAIL_VERIFICATION_COUNT) {
      throw new ForbiddenException('인증 횟수를 초과하였습니다.');
    }

    const newVerificationData: IEmailVerification = {
      email,
      verificationCode,
      count: verificationData?.count ? verificationData.count + 1 : 1,
      isComplete: false,
    };

    await this.redisRepository.set(`${this.EMAIL_VERIFICATION_ENDPOINT}:${email}`, newVerificationData);
  }

  async completeEmailVerification(email: string): Promise<void> {
    const verificationData = await this.getEmailVerificationData(email);

    if (!verificationData) {
      throw new NotFoundException('인증 데이터가 존재하지 않습니다.');
    }

    verificationData.isComplete = true;

    await this.redisRepository.set(`${this.EMAIL_VERIFICATION_ENDPOINT}:${email}`, verificationData);
  }
}
