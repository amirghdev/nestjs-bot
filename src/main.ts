import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//* Logger
import { CustomLogger } from './utils/custom-logger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule, {
    logger: new CustomLogger(),
  });

  Logger.verbose('BOT IS RUNNING', 'BOT');
}
bootstrap();
