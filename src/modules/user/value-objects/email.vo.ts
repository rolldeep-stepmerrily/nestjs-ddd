import { BadRequestException } from '@nestjs/common';
import { IsEmail, validateSync } from 'class-validator';
import { Either } from 'effect';

interface EmailProps {
  value: string;
}

export class Email {
  @IsEmail()
  private readonly value: string;

  private constructor(props: EmailProps) {
    this.value = props.value;
  }

  static create(email: string): Either.Either<BadRequestException, Email> {
    const emailInstance = new Email({ value: email });
    const errors = validateSync(emailInstance);

    if (errors.length > 0) {
      return Either.left(new BadRequestException(errors));
    }

    return Either.right(emailInstance);
  }

  get email(): string {
    return this.value;
  }
}
