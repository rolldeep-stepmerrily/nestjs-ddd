interface UserProps {
  email: string;
  name: string;
  password: string;
}

export class User {
  #id?: number;
  #props: UserProps;

  constructor(userProps: UserProps) {
    this.#props = userProps;
  }
}
