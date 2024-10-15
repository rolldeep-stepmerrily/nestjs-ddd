import { UserProps } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories';
import { Email, Name } from 'src/modules/user/value-objects';

export type CreateUserArgs = {
  [K in keyof UserProps]: string;
};

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(args: CreateUserArgs) {
    const emailOrError = Email.create(args.email);
    const nameOrError = Name.create(args.name);
  }
}
