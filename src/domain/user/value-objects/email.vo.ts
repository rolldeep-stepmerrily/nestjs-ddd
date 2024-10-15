import { IsEmail, IsNotEmpty, validateSync } from 'class-validator';
import { Either } from 'effect';
import { left, right } from 'effect/Either';

import { ValueObject } from 'src/shared/domain';
import { EmailError } from '../exceptions/domain-exceptions';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  @IsNotEmpty()
  @IsEmail()
  get email(): string {
    return this.props.value;
  }

  private constructor(emailProps: EmailProps) {
    super(emailProps);
  }

  static create(email: string): Either.Either<string, Email> {
    console.log(1);
    const emailInstance = new Email({ value: email });
    const errors = validateSync(emailInstance);

    if (errors.length > 0) {
      const error = errors[0].constraints;

      if (error?.isEmail) {
        return left(EmailError.InvalidEmail);
      }

      if (error?.isNotEmpty) {
        return left(EmailError.EmailIsRequired);
      }
    }

    return right(emailInstance);
  }
}
