import { User } from '../entities/user.entity';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  checkEmailExists(email: string): Promise<boolean>;
}
