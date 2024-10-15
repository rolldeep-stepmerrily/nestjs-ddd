import { isLeft, isRight, Left, Right } from 'effect/Either';
import { Name } from '../name.vo';

describe('Name', () => {
  it('유효한 이름 값으로 Name 인스턴스를 생성할 수 있어야 한다.', () => {
    const validName = '이영우';
    const result = Name.create(validName);
    const resultIsRight = isRight(result);

    expect(resultIsRight).toBe(true);
    expect((result as Right<never, Name>).right.props.value).toEqual(validName);
  });

  it('빈 값으로 Name 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidName = '';
    const result = Name.create(invalidName);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Name is required');
  });

  it('유효하지 않은 이름으로 Name 인스턴스를 생성하려 할 때 에러를 반환해야 한다.', () => {
    const invalidName = 'a';
    const result = Name.create(invalidName);
    const resultIsLeft = isLeft(result);

    expect(resultIsLeft).toBe(true);
    expect((result as Left<string, never>).left).toBe('Invalid name');
  });
});
