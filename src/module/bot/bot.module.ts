import { Module } from '@nestjs/common';
import { BotService } from './bot.service';

//* Modules

@Module({
  imports: [],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
