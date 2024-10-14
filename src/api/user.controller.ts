import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmailVerificationService } from 'src/application/user/services/email-verification.service';
import { CompleteEmailVerificaitonDto, RequestEmailVerificationDto } from 'src/modules/user/dto/user.request.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly emailVeirificationService: EmailVerificationService) {}

  @ApiOperation({ summary: '이메일 인증 요청' })
  @Post('email-verifications/request')
  async requestEmailVerification(@Body() { email }: RequestEmailVerificationDto) {
    await this.emailVeirificationService.requestEmailVerification(email);
  }

  @ApiOperation({ summary: '이메일 인증 완료' })
  @Post('email-verifications/complete')
  async compareAndCompleteEmailVerificaiton(@Body() { email, verificationCode }: CompleteEmailVerificaitonDto) {
    await this.emailVeirificationService.compareAndCompleteEmailVerificaiton(email, verificationCode);
  }
}