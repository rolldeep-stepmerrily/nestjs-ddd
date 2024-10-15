import { BadRequestException } from '@nestjs/common';
import { isLeft, isRight } from 'effect/Either';

import { Email } from '../email.vo';

describe('Email', () => {
  it('유효한 이메일로 Email 인스턴스를 생성할 수 있어야 한다.', () => {
    const validEmail = 'test@example.com';
    const result = Email.create(validEmail);

    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      expect(result.right.email).toBe(validEmail);
    }
  });

  it('유효하지 않은 이메일로 Email 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidEmail = 'invalid-email';
    const result = Email.create(invalidEmail);

    expect(isLeft(result)).toBe(true);
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(BadRequestException);
    }
  });

  it('생성된 Email 인스턴스의 email getter가 정상적으로 작동해야 한다.', () => {
    const validEmail = 'test@example.com';
    const result = Email.create(validEmail);

    if (isRight(result)) {
      const Email = result.right;
      expect(Email.email).toBe(validEmail);
    } else {
      fail('Email 인스턴스 생성에 실패했습니다.');
    }
  });
});
