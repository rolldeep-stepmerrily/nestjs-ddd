import { BadRequestException } from '@nestjs/common';
import { Matches, validateSync } from 'class-validator';
import { Either } from 'effect';
import * as bcrypt from 'bcrypt';

import { ValueObject } from 'src/shared/domain';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  @Matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,20}$/)
  get password(): string {
    return this.props.value;
  }

  private constructor(passwordProps: PasswordProps) {
    super(passwordProps);
  }

  static async create(password: string): Promise<Either.Either<BadRequestException, Password>> {
    const passwordInstance = new Password({ value: password });
    const errors = validateSync(passwordInstance);

    if (errors.length > 0) {
      return Either.left(new BadRequestException(errors));
    }

    return Either.right(new Password({ value: await this.hashPassword(password), hashed: true }));
  }

  private static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
