import { BadRequestException } from '@nestjs/common';
import { IsString, Length, validateSync } from 'class-validator';
import { Either } from 'effect';

import { ValueObject } from 'src/shared/domain';

interface NameProps {
  value: string;
}

export class Name extends ValueObject<NameProps> {
  @IsString()
  @Length(2, 10)
  get name(): string {
    return this.props.value;
  }

  private constructor(nameProps: NameProps) {
    super(nameProps);
  }

  static create(name: string): Either.Either<BadRequestException, Name> {
    const nameInstance = new Name({ value: name });
    const errors = validateSync(nameInstance);

    if (errors.length > 0) {
      return Either.left(new BadRequestException(errors));
    }

    return Either.right(nameInstance);
  }
}
