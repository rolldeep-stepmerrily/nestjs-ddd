import { BadRequestException } from '@nestjs/common';
import { Left, Right } from 'effect/Either';

import { Name } from '../name.vo';

describe('Name', () => {
  it('유효한 이름 값으로 Name 인스턴스를 생성할 수 있어야 한다.', () => {
    const validName = '이영우';

    expect((Name.create(validName) as Right<never, Name>).right.props.value).toEqual(validName);
  });

  it('유효하지 않은 이름으로 Name 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidName = 'n';

    expect((Name.create(invalidName) as Left<BadRequestException, never>).left).toBeInstanceOf(BadRequestException);
  });
});
