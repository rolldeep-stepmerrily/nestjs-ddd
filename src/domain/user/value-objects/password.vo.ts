import { IsNotEmpty, Matches, validateSync } from 'class-validator';
import { Either } from 'effect';
import { left, right } from 'effect/Either';
import * as bcrypt from 'bcrypt';

import { ValueObject } from 'src/shared/domain';
import { PasswordError } from '../exceptions/domain-exceptions';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  @IsNotEmpty()
  @Matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,20}$/)
  get password(): string {
    return this.props.value;
  }

  private constructor(passwordProps: PasswordProps) {
    super(passwordProps);
  }

  private static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async create(password: string): Promise<Either.Either<string, Password>> {
    const passwordInstance = new Password({ value: password });
    const errors = validateSync(passwordInstance);

    if (errors.length > 0) {
      const error = errors[0].constraints;

      if (error?.matches) {
        return left(PasswordError.InvalidPassword);
      }

      if (error?.isNotEmpty) {
        return left(PasswordError.PasswordIsRequired);
      }
    }

    return right(new Password({ value: await this.hashPassword(password), hashed: true }));
  }
}
