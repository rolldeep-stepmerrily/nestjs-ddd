import { BadRequestException } from '@nestjs/common';
import { Left, Right } from 'effect/Either';
import * as bcrypt from 'bcrypt';

import { Password } from '../password.vo';

describe('Password', () => {
  it('유효한 비밀번호로 Password 인스턴스를 생성할 수 있어야 한다.', async () => {
    const validPassword = 'qwer1234!';

    const passwordOrError = await Password.create(validPassword);

    expect(bcrypt.compare(validPassword, (passwordOrError as Right<never, Password>).right.props.value)).toBeTruthy();
  });

  it('유효하지 않은 비밀번호로 Password 인스턴스를 생성하려 할 때 400 에러를 반환해야 한다.', async () => {
    const invalidPassword = 'invalid-password';

    expect(((await Password.create(invalidPassword)) as Left<BadRequestException, never>).left).toBeInstanceOf(
      BadRequestException,
    );
  });
});
