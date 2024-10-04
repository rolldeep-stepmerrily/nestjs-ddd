import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from 'src/application/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: { ...user },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserById(id: number) {
    try {
      return await this.prismaService.user.findUnique({ where: { id }, select: { id: true, email: true, name: true } });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
