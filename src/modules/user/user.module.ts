import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { EmailModule } from '../../infrastructure/email/email.module';
import { UserController } from 'src/api/user.controller';
import { UserRepository } from '../../infrastructure/prisma/repositories';
import { EmailVerificationService } from 'src/application/user/services/email-verification.service';

@Module({
  imports: [PrismaModule, RedisModule, EmailModule, JwtModule],
  controllers: [UserController],
  providers: [UserRepository, EmailVerificationService],
})
export class UserModule {}
