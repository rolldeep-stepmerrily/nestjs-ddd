import { isLeft, isRight, Left, Right } from 'effect/Either';
import { Name } from '../name.vo';

describe('Name', () => {
 it('should create Name instance with valid name value', () => {
   const validName = '이영우';
   const result = Name.create(validName);
   const resultIsRight = isRight(result);
   expect(resultIsRight).toBe(true);
   expect((result as Right<never, Name>).right.props.value).toEqual(validName);
 });

 it('should return error when trying to create Name instance with empty value', () => {
   const invalidName = '';
   const result = Name.create(invalidName);
   const resultIsLeft = isLeft(result);
   expect(resultIsLeft).toBe(true);
   expect((result as Left<string, never>).left).toBe('Name is required');
 });

 it('should return error when trying to create Name instance with invalid name', () => {
   const invalidName = 'a';
   const result = Name.create(invalidName);
   const resultIsLeft = isLeft(result);
   expect(resultIsLeft).toBe(true);
   expect((result as Left<string, never>).left).toBe('Invalid name');
 });
});
