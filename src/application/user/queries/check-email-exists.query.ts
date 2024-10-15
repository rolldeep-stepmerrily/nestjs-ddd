import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/repositories';
import { USER_REPOSITORY } from 'src/shared/constants/injection-tokens';

@Injectable()
export class CheckEmailExistsQuery {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<boolean> {
    return await this.userRepository.checkEmailExists(email);
  }
}
