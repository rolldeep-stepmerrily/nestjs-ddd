import { isLeft, isRight, Left, Right } from 'effect/Either';
import { Email } from '../email.vo';

describe('Email', () => {
 it('should create Email instance with valid email value', () => {
   const validEmail = 'rolldeep@stepmerrily.com';
   const result = Email.create(validEmail);
   const resultIsRight = isRight(result);
   expect(resultIsRight).toBe(true);
   expect((result as Right<never, Email>).right.props.value).toEqual(validEmail);
 });

 it('should return error when trying to create Email instance with empty value', () => {
   const invalidEmail = '';
   const result = Email.create(invalidEmail);
   const resultIsLeft = isLeft(result);
   expect(resultIsLeft).toBe(true);
   expect((result as Left<string, never>).left).toBe('Email is required');
 });

 it('should return error when trying to create Email instance with invalid email format', () => {
   const invalidEmail = 'invalid-email';
   const result = Email.create(invalidEmail);
   const resultIsLeft = isLeft(result);
   expect(resultIsLeft).toBe(true);
   expect((result as Left<string, never>).left).toBe('Invalid email');
 });
});
