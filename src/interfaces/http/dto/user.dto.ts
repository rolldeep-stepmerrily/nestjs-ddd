import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RequestEmailVerificationDto {
  @ApiProperty({ description: '이메일', required: true, example: 'abcd@example.com' })
  @IsEmail()
  email: string;
}

export class CompleteEmailVerificaitonDto {
  @ApiProperty({ description: '이메일', required: true, example: 'abcd@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '인증 코드', required: true, example: '123456' })
  @IsString()
  @Length(6)
  verificationCode: string;
}
