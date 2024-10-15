import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
}
