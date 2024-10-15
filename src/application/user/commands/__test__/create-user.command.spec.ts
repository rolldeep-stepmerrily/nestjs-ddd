import { Test, TestingModule } from '@nestjs/testing';
import { Either } from 'effect';

import { UserRepository } from 'src/domain/user/repositories';
import { CreateUserCommand } from '../create-user.command';
import { CheckEmailExistsQuery } from '../../queries';
import { USER_REPOSITORY } from 'src/shared/constants/injection-tokens';
import { CreateUserCommandDto } from 'src/domain/user/dto/user.dto';
import { User } from 'src/domain/user/entities/user.entity';
import { CreateUserResponseDto } from 'src/interfaces/api/dto/response';

describe('CreateUserCommand', () => {
  let createUserCommand: CreateUserCommand;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let checkEmailExistsQueryMock: jest.Mocked<CheckEmailExistsQuery>;

  beforeEach(async () => {
    userRepositoryMock = {
      createUser: jest.fn(),
    } as any;

    checkEmailExistsQueryMock = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserCommand,
        { provide: USER_REPOSITORY, useValue: userRepositoryMock },
        { provide: CheckEmailExistsQuery, useValue: checkEmailExistsQueryMock },
      ],
    }).compile();

    createUserCommand = module.get<CreateUserCommand>(CreateUserCommand);
  });

  it('should be defined', () => {
    expect(createUserCommand).toBeDefined();
  });

  describe('execute', () => {
    const validDto: CreateUserCommandDto = {
      email: 'rolldeep@stepmerrily.com',
      name: '이영우',
      password: 'qwer1234!',
    };

    it('성공적으로 유저 생성하기', async () => {
      checkEmailExistsQueryMock.execute.mockResolvedValue(false);
      userRepositoryMock.createUser.mockResolvedValue(new User({ id: 'user-id', ...validDto } as any));

      const result = await createUserCommand.execute(validDto);

      expect(Either.isRight(result)).toBe(true);
      if (Either.isRight(result)) {
        expect(result.right).toBeInstanceOf(CreateUserResponseDto);
        expect(result.right.id).toBe('user-id');
      }
    });
  });
});
