import { Email } from '../value-objects';

export interface UserProps {
  email: Email;
  name: string;
  password: string;
}

export class User {
  #id?: number;
  #props: UserProps;

  private constructor(userProps: UserProps) {
    this.#props = userProps;
  }
}
