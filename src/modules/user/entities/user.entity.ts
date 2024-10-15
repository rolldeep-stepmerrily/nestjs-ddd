import { EntityClass, Identifier } from 'src/shared/domain';
import { Email, Name, Password } from '../value-objects';

export interface UserProps {
  id?: number;
  email: Email;
  name: Name;
  password: Password;
}

export class User extends EntityClass<UserProps> {
  constructor(userProps: UserProps) {
    super(userProps, new Identifier(userProps.id));
  }
}
