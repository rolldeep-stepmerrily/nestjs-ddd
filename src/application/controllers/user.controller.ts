import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserAuthenticationService, UserRegistrationService, UserVerificationService } from 'src/domain/services/users';
import {
  CompleteEmailVerificationDto,
  CreateUserDto,
  RequestEmailVerificationDto,
  SignInUserDto,
} from '../dto/user.dto';
import { User } from 'src/shared/decorators';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly verificationService: UserVerificationService,
    private readonly registrationService: UserRegistrationService,
    private readonly authenticationService: UserAuthenticationService,
  ) {}

  @ApiOperation({ summary: '이메일 인증 요청' })
  @Post('email-verification/request')
  async requestEmailVerification(@Body() { email }: RequestEmailVerificationDto) {
    await this.verificationService.requestEmailVerification(email);
  }

  @ApiOperation({ summary: '이메일 인증 확인' })
  @Post('email-verification/complete')
  async completeEmailVerification(@Body() { email, code }: CompleteEmailVerificationDto) {
    await this.verificationService.completeEmailVerification({ email, code });
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.registrationService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.authenticationService.signIn(signInUserDto);
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiBearerAuth('refreshToken')
  @UseGuards(AuthGuard('refresh'))
  @Get('access')
  async createAccessToken(@User('id') id: number) {
    return await this.authenticationService.createAccessToken(id);
  }
}
