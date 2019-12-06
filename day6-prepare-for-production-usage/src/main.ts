import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { requestLogger } from './request-logger.middleware';
import { Logger } from '@nestjs/common';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: config.logLevel });
  const logger = new Logger();
  app.useLogger(logger);
  app.use(requestLogger(logger));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
