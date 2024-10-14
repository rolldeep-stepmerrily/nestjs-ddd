interface UserProps {
  email: string;
  name: string;
  password: string;
}

export class User {
  #id?: number;
  #props: UserProps;

  private constructor(userProps: UserProps) {
    this.#props = userProps;
  }

  static createUser(userProps: UserProps) {
    return new User(userProps);
  }
}
