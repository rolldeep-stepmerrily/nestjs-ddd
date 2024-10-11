import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const user = configService.getOrThrow<string>('EMAIL_ADDRESS');
        const pass = configService.getOrThrow<string>('EMAIL_PASSWORD');

        return {
          transport: { host: 'smtp.daum.net', port: 465, auth: { user, pass } },
          defaults: { from: 'Your Wavelength <rolldeep@stepmerrily.com>' },
          template: {
            dir: join(__dirname, '..', '..', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
