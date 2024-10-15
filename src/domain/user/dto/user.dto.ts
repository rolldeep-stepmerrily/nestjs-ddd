import { UserProps } from '../entities/user.entity';

export type CreateUserCommandDto = {
  [K in keyof UserProps]: string;
};
