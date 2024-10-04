import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';
import { UserController } from 'src/application/controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from 'src/domain/services/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
