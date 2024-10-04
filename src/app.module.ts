import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { PrismaModule } from './infrastructure/database/prisma.module';
import { HttpLoggerMiddleware } from './common/middlewares';
import { AppController } from './application/controllers/app.controller';
import { ConfigProviderModule } from './common/config-provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVER_URL: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        ADMIN_NAME: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        GUEST_NAME: Joi.string().required(),
        GUEST_PASSWORD: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: '.env',
      validationOptions: { abortEarly: true },
    }),
    PrismaModule,
    ConfigProviderModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
