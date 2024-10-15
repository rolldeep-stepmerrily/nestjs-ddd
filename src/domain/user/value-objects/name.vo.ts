import { IsNotEmpty, Length, validateSync } from 'class-validator';
import { Either } from 'effect';
import { left, right } from 'effect/Either';

import { ValueObject } from 'src/shared/domain';
import { NameError } from '../exceptions/domain-exceptions';

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  @IsNotEmpty()
  @Length(2, 10)
  get name(): string {
    return this.props.value;
  }

  private constructor(nameProps: NameProps) {
    super(nameProps);
  }

  static create(name: string): Either.Either<string, Name> {
    const nameInstance = new Name({ value: name });
    const errors = validateSync(nameInstance);

    if (errors.length > 0) {
      const error = errors[0].constraints;

      if (error?.isLength) {
        return left(NameError.InvalidName);
      }

      if (error?.isNotEmpty) {
        return left(NameError.NameIsRequired);
      }
    }

    return right(nameInstance);
  }
}
