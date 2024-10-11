import { ConfigService } from '@nestjs/config';

const createConfigProvider = <T>(key: string, type: 'string' | 'number' = 'string') => {
  return {
    provide: key,
    useFactory: (configService: ConfigService) => {
      const value = configService.getOrThrow<T>(key);
      return type === 'number' ? Number(value) : value;
    },
    inject: [ConfigService],
  };
};

export const SERVER_URL_PROVIDER = createConfigProvider<string>('SERVER_URL');
export const NODE_ENV_PROVIDER = createConfigProvider<string>('NODE_ENV');
export const PORT_PROVIDER = createConfigProvider<number>('PORT', 'number');
export const ADMIN_NAME_PROVIDER = createConfigProvider<string>('ADMIN_NAME');
export const ADMIN_PASSWORD_PROVIDER = createConfigProvider<string>('ADMIN_PASSWORD');
export const DATABASE_URL_PROVIDER = createConfigProvider<string>('DATABASE_URL');
export const JWT_SECRET_KEY_PROVIDER = createConfigProvider<string>('JWT_SECRET_KEY');
export const EMAIL_ADDRESS_PROVIDER = createConfigProvider<string>('EMAIL_ADDRESS');
export const EMAIL_PASSWORD_PROVIDER = createConfigProvider<string>('EMAIL_PASSWORD');
export const AWS_ACCESS_KEY_ID_PROVIDER = createConfigProvider<string>('AWS_ACCESS_KEY_ID');
export const AWS_SECRET_ACCESS_KEY_PROVIDER = createConfigProvider<string>('AWS_SECRET_ACCESS_KEY');
export const AWS_REGION_PROVIDER = createConfigProvider<string>('AWS_REGION');
export const AWS_S3_BUCKET_PROVIDER = createConfigProvider<string>('AWS_S3_BUCKET');
export const AWS_CLOUDFRONT_DOMAIN_PROVIDER = createConfigProvider<string>('AWS_CLOUDFRONT_DOMAIN');
export const REDIS_HOST_PROVIDER = createConfigProvider<string>('REDIS_HOST');
export const REDIS_PASSWORD_PROVIDER = createConfigProvider<string>('REDIS_PASSWORD');
export const REDIS_PORT_PROVIDER = createConfigProvider<number>('REDIS_PORT', 'number');
export const GIT_ACCESS_TOKEN_PROVIDER = createConfigProvider<string>('GIT_ACCESS_TOKEN');