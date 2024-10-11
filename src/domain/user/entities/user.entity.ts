import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import bcrypt from 'bcrypt';

export class User {
  readonly #id: number;
  #email: string;
  #name: string;
  #password: string;
  readonly #createdAt: Date;
  #updatedAt: Date | null;
  #deletedAt: Date | null;

  constructor(
    id: number,
    name: string,
    email: string,
    hashedPassword: string,
    createdAt: Date,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
  ) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = hashedPassword;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt || null;
    this.#deletedAt = deletedAt || null;
  }

  get id(): number {
    return this.#id;
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

  get updatedAt(): string | null {
    return this.#updatedAt?.toISOString() || null;
  }

  get deletedAt(): string | null {
    return this.#deletedAt?.toISOString() || null;
  }

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.#password);
  }

  isActive(): boolean {
    return this.#deletedAt === null;
  }
}
