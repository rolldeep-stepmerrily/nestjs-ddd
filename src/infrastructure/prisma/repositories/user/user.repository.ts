import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserRepository } from 'src/domain/user/repositories';
import { PrismaService } from '../../prisma.service';
import { User } from 'src/domain/user/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: user.props.email.props.value,
          name: user.props.name.props.value,
          password: user.props.password.props.value,
        },
        select: { id: true },
      });

      return new User({
        id: newUser.id,
        email: user.props.email,
        name: user.props.name,
        password: user.props.password,
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const user = await this.prismaService.user.findUnique({ where: { email } });

      return !!user;
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
