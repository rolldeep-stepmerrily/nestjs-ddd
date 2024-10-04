import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../database/prisma/prisma.module';
import { RedisModule } from '../database/redis/redis.module';
import { EmailModule } from '../external-services/email/email.module';
import { UserController } from 'src/application/controllers/user.controller';
import { UserRepository } from '../repositories/prisma';
import { UserAuthenticationService, UserRegistrationService, UserVerificationService } from 'src/domain/services/users';
import { JwtTokenService } from '../services/jwt-token.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../auth/strategies';

@Module({
  imports: [PrismaModule, RedisModule, EmailModule, JwtModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserRegistrationService,
    UserVerificationService,
    UserAuthenticationService,
    { provide: 'ITokenService', useClass: JwtTokenService },
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class UserModule {}
