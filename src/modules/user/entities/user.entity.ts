import { Either } from 'effect/StreamHaltStrategy';
import { EmailVO } from '../value-objects';
import { pipe } from 'effect';

interface UserProps {
  email: EmailVO;
  name: string;
  password: string;
}

export type CreateUserArgs = {
  [K in keyof UserProps]: string;
}; // 다른 레이어로 옮겨야하는지 고민 필요

export class User {
  #id?: number;
  #props: UserProps;

  private constructor(userProps: UserProps) {
    this.#props = userProps;
  }

  //TODO : 작성중 말았음. 수정 필요
  static createUser(props: CreateUserArgs): Either<Error, User> {
    return pipe(EmailVO.create(props.email));
  }
}
