import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { RedisModule } from '../../infrastructure/cache/redis/redis.module';
import { EmailModule } from '../../infrastructure/email/email.module';
import { UserController } from 'src/interfaces/http/controllers/user.controller';
import { UserRepository } from '../../infrastructure/database/repositories';

@Module({
  imports: [PrismaModule, RedisModule, EmailModule, JwtModule],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
