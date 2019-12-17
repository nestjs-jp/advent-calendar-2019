import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  if (process.env.NODE_ENV === 'production' && !process.env.SENTRY_DSN) {
    // tslint:disable-next-line:no-console
    console.error('Missing required environment variable \'SENTRY_DSN\'');
    return process.exit(1);
  }
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
