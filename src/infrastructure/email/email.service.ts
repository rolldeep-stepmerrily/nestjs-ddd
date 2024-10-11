import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(email: string, code: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: '[Your Wavelength] 이메일 인증 코드 입니다.',
        template: 'verification',
        context: { code },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException('이메일 발송 실패');
    }
  }
}
