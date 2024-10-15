import { isLeft, isRight, Left, Right } from 'effect/Either';
import * as bcrypt from 'bcrypt';

import { Password } from '../password.vo';

describe('Password', () => {
  it('유효한 비밀번호로 Password 인스턴스를 생성할 수 있어야 한다.', async () => {
    const validPassword = 'qwer1234!';
    const result = await Password.create(validPassword);
    const resultIsRight = isRight(result);

    expect(resultIsRight).toBe(true);
    expect(bcrypt.compare(validPassword, (result as Right<never, Password>).right.props.value)).toBeTruthy();
  });

  it('빈 값으로 Password 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', async () => {
    const invalidPassword = '';
    const result = await Password.create(invalidPassword);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Password is required');
  });

  it('유효하지 않은 비밀번호로 Password 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', async () => {
    const invalidPassword = 'invalid-password';
    const result = await Password.create(invalidPassword);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Invalid password');
  });
});
