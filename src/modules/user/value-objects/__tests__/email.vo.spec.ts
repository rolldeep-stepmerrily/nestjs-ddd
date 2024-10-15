import { BadRequestException } from '@nestjs/common';
import { Left, Right } from 'effect/Either';

import { Email } from '../email.vo';

describe('Email', () => {
  it('유효한 이메일 값으로 Email 인스턴스를 생성할 수 있어야 한다.', () => {
    const validEmail = 'rolldeep@stepmerrily.com';

    expect((Email.create(validEmail) as Right<never, Email>).right.props.value).toEqual(validEmail);
  });

  it('유효하지 않은 이메일로 Email 인스턴스를 생성하려 할 때 400 에러를 반환해야 한다.', () => {
    const invalidEmail = 'invalid-email';

    expect((Email.create(invalidEmail) as Left<BadRequestException, never>).left).toBeInstanceOf(BadRequestException);
  });
});
