import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestEmailVerificationDto {
  @ApiProperty({ description: '이메일', required: true, example: 'abcd@example.com' })
  @IsEmail()
  email: string;
}
