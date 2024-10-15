import { BadRequestException } from '@nestjs/common';
import { isLeft, isRight } from 'effect/Either';

import { Name } from '../name.vo';

describe('Name', () => {
  it('유효한 이름으로 Name 인스턴스를 생성할 수 있어야 한다.', () => {
    const validName = '이영우';
    const result = Name.create(validName);

    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      expect(result.right.name).toBe(validName);
    }
  });

  it('유효하지 않은 이름으로 Name 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidName = 'n';
    const result = Name.create(invalidName);

    expect(isLeft(result)).toBe(true);

    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(BadRequestException);
    }
  });

  it('생성된 Name 인스턴스의 name getter가 정상적으로 작동해야 한다.', () => {
    const validName = '이영우';
    const result = Name.create(validName);

    if (isRight(result)) {
      const name = result.right;
      expect(name.name).toBe(validName);
    } else {
      fail('Name 인스턴스 생성에 실패했습니다.');
    }
  });
});
