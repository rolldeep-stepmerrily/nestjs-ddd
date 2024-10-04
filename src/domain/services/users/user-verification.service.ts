import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { CompleteEmailVerificationDto } from 'src/application/dto/user.dto';
import { EmailService } from 'src/infrastructure/external-services/email/email.service';
import { EmailVerificationRepository } from 'src/infrastructure/repositories/redis';

@Injectable()
export class UserVerificationService {
  private readonly MAX_VERIFICATION_ATTEMPTS = 5;

  constructor(
    private readonly emailService: EmailService,
    private readonly emailVerificationRepository: EmailVerificationRepository,
  ) {}

  generateVerificationCode(): string {
    return `${Math.floor(Math.random() * 1000000)}`.padStart(6, '0');
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {
    const result = await this.emailService.sendVerificationEmail(email, code);

    if (result?.accepted?.length !== [email].length) {
      throw new InternalServerErrorException('이메일 발송 실패');
    }
  }

  async setVerification(email: string, code: string): Promise<void> {
    await this.emailVerificationRepository.setVerification(email, code);
  }

  async requestEmailVerification(email: string): Promise<void> {
    try {
      const verification = await this.emailVerificationRepository.getVerification(email);

      if (verification && verification.count >= this.MAX_VERIFICATION_ATTEMPTS) {
        throw new UnauthorizedException('인증 횟수 초과');
      }

      const code = this.generateVerificationCode();

      await Promise.all([this.sendVerificationEmail(email, code), this.setVerification(email, code)]);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException('이메일 발송 중 오류 발생');
    }
  }

  async completeEmailVerification({ email, code }: CompleteEmailVerificationDto): Promise<void> {
    const verification = await this.emailVerificationRepository.getVerification(email);

    if (!verification) {
      throw new NotFoundException('인증 정보를 찾을 수 없습니다.');
    }

    if (verification.code !== code) {
      throw new UnauthorizedException('인증 코드가 일치하지 않습니다.');
    }

    await this.emailVerificationRepository.completeVerification(email);
  }

  async isVerificationComplete(email: string): Promise<boolean> {
    const verification = await this.emailVerificationRepository.getVerification(email);

    if (!verification) {
      throw new NotFoundException('인증 정보를 찾을 수 없습니다.');
    }

    return verification.isComplete;
  }

  async deleteVerification(email: string): Promise<void> {
    await this.emailVerificationRepository.deleteVerification(email);
  }
}
