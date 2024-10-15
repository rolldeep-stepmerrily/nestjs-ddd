import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmailVerificationService } from 'src/application/user/services/email-verification.service';
import {
  CompleteEmailVerificaitonDto,
  CreateUserDto,
  RequestEmailVerificationDto,
} from '../dto/request/user.request.dto';
import { CreateUserCommand } from 'src/application/user/commands';
import { Either } from 'effect';
import { DuplicateEmailError, UserCreationError } from 'src/domain/user/exceptions/domain-exceptions';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly emailVeirificationService: EmailVerificationService,
    private readonly createUserCommand: CreateUserCommand,
  ) {}

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

  @ApiOperation({ summary: '사용자 생성' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.createUserCommand.execute(createUserDto);

    if (Either.isLeft(createUser)) {
      const error = createUser.left;

      switch (error.constructor) {
        case DuplicateEmailError:
          throw new BadRequestException(error.message);
        case UserCreationError:
          throw new InternalServerErrorException(error.message);
        default:
          throw new Error('알 수 없는 오류가 발생했습니다.');
      }
    }

    return createUser.right;
  }
}
