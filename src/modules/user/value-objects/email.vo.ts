import { BadRequestException } from '@nestjs/common';
import { IsEmail, validateSync } from 'class-validator';
import { Either } from 'effect';

import { ValueObject } from 'src/shared/domain';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  @IsEmail()
  get email(): string {
    return this.props.value;
  }

  private constructor(emailProps: EmailProps) {
    super(emailProps);
  }

  static create(email: string): Either.Either<BadRequestException, Email> {
    const emailInstance = new Email({ value: email });
    const errors = validateSync(emailInstance);

    if (errors.length > 0) {
      return Either.left(new BadRequestException(errors));
    }

    return Either.right(emailInstance);
  }
}
