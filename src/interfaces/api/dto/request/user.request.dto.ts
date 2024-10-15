import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

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

export class CreateUserDto {
  @ApiProperty({ description: '이메일', required: true, example: 'abcd@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '이름', required: true, example: '홍길동' })
  @IsString()
  name: string;

  @ApiProperty({ description: '비밀번호', required: true, example: 'qwer1234!' })
  @Matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,20}$/)
  @IsString()
  password: string;
}
