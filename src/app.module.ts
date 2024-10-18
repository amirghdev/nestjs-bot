import { Module } from '@nestjs/common';

//* Validation
import { validate } from './config/env-validation';

//* Modules
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './base/database/database.module';
import { BotModule } from './module/bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';

//* Telegram
import { session } from 'telegraf';
import { CustomContext } from './common/class/custom-context';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
      botName: 'basic-bot',
      middlewares: [session()],
      options: {
        contextType: CustomContext,
      },
    }),
    BotModule,
  ],
})
export class AppModule {}
