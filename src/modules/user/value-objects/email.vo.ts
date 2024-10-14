import { BadRequestException } from '@nestjs/common';
import { IsEmail, validateSync } from 'class-validator';
import { left, right } from 'effect/Either';

interface EmailProps {
  value: string;
}

export class EmailVO {
  @IsEmail()
  private readonly value: string;

  private constructor(props: EmailProps) {
    console.log(props.value);
    this.value = props.value;
  }

  static create(email: string) {
    const emailInstance = new EmailVO({ value: email });
    const errors = validateSync(emailInstance);
    if (errors.length) {
      console.log(errors);
      return left(new BadRequestException(errors));
    }

    return right(emailInstance);
  }

  get email(): string {
    return this.value;
  }
}
