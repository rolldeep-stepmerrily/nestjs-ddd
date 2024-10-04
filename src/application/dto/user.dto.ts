import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { User } from 'src/domain/entities';

export class RequestEmailVerificationDto extends PickType(User, ['email']) {}

export class CompleteEmailVerificationDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '인증 코드', required: true, example: '123456' })
  @IsString()
  @Length(6)
  code: string;
}

export class CreateUserDto extends PickType(User, ['email', 'name', 'password']) {}

export class SignInUserDto extends PickType(User, ['email', 'password']) {}
