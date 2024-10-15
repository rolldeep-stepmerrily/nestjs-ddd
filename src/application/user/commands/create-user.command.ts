import { BadRequestException } from '@nestjs/common';
import { Either } from 'effect';

import { CreateUserResponseDto } from 'src/modules/user/dto/user.response.dto';
import { User, UserProps } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories';
import { Email, Name, Password } from 'src/modules/user/value-objects';

export type CreateUserArgs = {
  [K in keyof UserProps]: string;
};

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(args: CreateUserArgs) {
    const emailOrError = Email.create(args.email);
    const nameOrError = Name.create(args.name);
    const passwordOrError = await Password.create(args.password);

    const propsOrError = Either.all([emailOrError, nameOrError, passwordOrError]);

    if (Either.isLeft(propsOrError)) {
      return Either.left(propsOrError.left);
    }

    const [email, name, password] = propsOrError.right;

    const isEmailExisting = await this.userRepository.checkEmailExists(email.email);

    if (isEmailExisting) {
      return Either.left(new BadRequestException('중복된 이메일입니다.'));
    }

    const user = new User({ email, name, password });

    const newUser = await this.userRepository.createUser(user);

    if (!newUser || !newUser.props.id) {
      return Either.left(new BadRequestException('사용자 생성에 실패했습니다.'));
    }

    return Either.right(new CreateUserResponseDto(newUser.props.id));
  }
}
