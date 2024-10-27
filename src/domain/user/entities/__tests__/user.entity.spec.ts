import { Right } from 'effect/Either';

import { Email, Name, Password } from '../../value-objects';
import { User } from '../user.entity';

describe('User', () => {
  let email: Email;
  let name: Name;
  let password: Password;

  beforeAll(async () => {
    const validEmail = 'rolldeep@stepmerrily.com';
    const emailResult = Email.create(validEmail);

    email = (emailResult as Right<never, Email>).right;

    const validName = '이영우';
    const nameResult = Name.create(validName);

    name = (nameResult as Right<never, Name>).right;

    const validPassword = 'qwer1234!';
    const passwordResult = await Password.create(validPassword);

    password = (passwordResult as Right<never, Password>).right;
  });

  it('should be able to create User with valid UserProps', () => {
    const user = new User({ email, name, password });

    expect(user).toBeDefined();
  });

  it('should return true when comparing two users with same id', () => {
    const user1 = new User({ id: 1, email, name, password });

    const user2 = new User({ id: 1, email, name, password });

    expect(user1.equals(user2)).toBe(true);
  });
});
