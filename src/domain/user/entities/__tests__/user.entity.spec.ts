import { Right } from 'effect/Either';
import { Email, Name, Password } from '../../value-objects';
import { User } from '../user.entity';

describe('User', () => {
  let email: Email;
  let name: Name;
  let password: Password;

  beforeAll(async () => {
    const validEmail = 'rolldeep@stepmerrily.com';
    email = (Email.create(validEmail) as Right<never, Email>).right;

    const validName = '이영우';
    name = (Name.create(validName) as Right<never, Name>).right;

    const validPassword = 'qwer1234!';
    password = ((await Password.create(validPassword)) as Right<never, Password>).right;
  });

  it('유효한 UserProps 값으로 User를 생성할 수 있어야 한다.', () => {
    const user = new User({ email, name, password });

    expect(user).toBeDefined();
  });

  it('두 유저를 비교하기', () => {
    const user1 = new User({ id: 1, email, name, password });

    const user2 = new User({ id: 1, email, name, password });

    expect(user1.equals(user2)).toBe(true);
  });
});
