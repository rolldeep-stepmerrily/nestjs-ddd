import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import dayjs from 'dayjs';

export class User {
  readonly #id: number;
  #name: string;
  #email: string;
  #password: string;
  readonly #createdAt: Date;
  #deletedAt: Date | null;

  constructor(id: number, name: string, email: string, password: string, createdAt: Date, deletedAt?: Date | null) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#createdAt = createdAt;
    this.#deletedAt = deletedAt || null;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  @ApiProperty({ description: '이름', example: '홍길동', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  set name(name: string) {
    this.#name = name;
  }

  get email(): string {
    return this.#email;
  }

  @ApiProperty({ description: '이메일', example: 'example@example.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  set email(email: string) {
    this.#email = email;
  }

  get password(): string {
    return this.#password;
  }

  @ApiProperty({ description: '비밀번호', example: 'password1!', required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,20}$/, { message: 'password must be a password' })
  set password(password: string) {
    this.#password = password;
  }

  get createdAt(): string {
    return this.#createdAt.toISOString();
  }

  get deletedAt(): string | null {
    return this.#deletedAt?.toISOString() || null;
  }

  set deletedAt(deletedAt: Date) {
    this.#deletedAt = deletedAt;
  }
}
