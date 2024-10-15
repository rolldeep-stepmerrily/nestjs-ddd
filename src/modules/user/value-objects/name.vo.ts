import { BadRequestException } from '@nestjs/common';
import { IsString, Length, validateSync } from 'class-validator';
import { Either } from 'effect';

interface NameProps {
  value: string;
}

export class Name {
  @IsString()
  @Length(2, 10)
  private readonly value: string;

  private constructor(props: NameProps) {
    this.value = props.value;
  }

  static create(name: string): Either.Either<BadRequestException, Name> {
    const nameInstance = new Name({ value: name });
    const errors = validateSync(nameInstance);

    if (errors.length > 0) {
      return Either.left(new BadRequestException(errors));
    }

    return Either.right(nameInstance);
  }

  get name(): string {
    return this.value;
  }
}
