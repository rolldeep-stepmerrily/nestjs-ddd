import { isLeft, isRight, Left, Right } from 'effect/Either';

import { Email } from '../email.vo';

describe('Email', () => {
  it('유효한 이메일 값으로 Email 인스턴스를 생성할 수 있어야 한다.', () => {
    const validEmail = 'rolldeep@stepmerrily.com';
    const result = Email.create(validEmail);
    const resultIsRight = isRight(result);

    expect(resultIsRight).toBe(true);
    expect((result as Right<never, Email>).right.props.value).toEqual(validEmail);
  });

  it('빈 값으로 Email 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidEmail = '';
    const result = Email.create(invalidEmail);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Email is required');
  });

  it('유효하지 않은 이메일로 Email 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidEmail = 'invalid-email';
    const result = Email.create(invalidEmail);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Invalid email');
  });
});
