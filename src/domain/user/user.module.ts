import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { EmailModule } from '../../infrastructure/email/email.module';
import { UserController } from 'src/interfaces/api/controllers/user.controller';
import { EmailVerificationService } from 'src/application/user/services/email-verification.service';
import { UserRepositoryImpl } from 'src/infrastructure/prisma/repositories/user';
import { CreateUserCommand } from 'src/application/user/commands';
import { CheckEmailExistsQuery } from 'src/application/user/queries';
import { USER_REPOSITORY } from 'src/shared/constants/injection-tokens';

@Module({
  imports: [PrismaModule, RedisModule, EmailModule, JwtModule],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    EmailVerificationService,
    CreateUserCommand,
    CheckEmailExistsQuery,
  ],
})
export class UserModule {}
