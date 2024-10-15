import { Inject, Injectable } from '@nestjs/common';
import { Either } from 'effect';

import { USER_REPOSITORY } from 'src/shared/constants/injection-tokens';
import { CreateUserCommandDto } from 'src/domain/user/dto/user.dto';
import { User } from 'src/domain/user/entities/user.entity';
import { UserRepository } from 'src/domain/user/repositories';
import { Email, Name, Password } from 'src/domain/user/value-objects';
import { CheckEmailExistsQuery } from '../queries';
import { CreateUserResponseDto } from 'src/interfaces/api/dto/response';
import { DuplicateEmailError, UserCreationError } from 'src/domain/user/exceptions/domain-exceptions';

@Injectable()
export class CreateUserCommand {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly checkEmailExistsQuery: CheckEmailExistsQuery,
  ) {}

  async execute(createUserCommandDto: CreateUserCommandDto) {
    const emailOrError = Email.create(createUserCommandDto.email);
    const nameOrError = Name.create(createUserCommandDto.name);
    const passwordOrError = await Password.create(createUserCommandDto.password);

    const propsOrError = Either.all([emailOrError, nameOrError, passwordOrError]);

    if (Either.isLeft(propsOrError)) {
      return Either.left(propsOrError.left);
    }

    const [email, name, password] = propsOrError.right;

    const isEmailExisting = await this.checkEmailExistsQuery.execute(email.props.value);

    if (isEmailExisting) {
      return Either.left(new DuplicateEmailError(email.props.value));
    }

    const user = new User({ email, name, password });

    const newUser = await this.userRepository.createUser(user);

    if (!newUser || !newUser.props.id) {
      return Either.left(new UserCreationError());
    }

    return Either.right(new CreateUserResponseDto(newUser.props.id));
  }
}
