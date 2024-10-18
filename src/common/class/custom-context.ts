import { Injectable } from '@nestjs/common';
import { Context as TelegrafContext, Telegram } from 'telegraf';
import { InlineKeyboardButton, Update, UserFromGetMe } from 'telegraf/types';

export interface SessionData {
  message_id?: number;
  stage?: number;
  questions?: {
    question: string;
    answer: string;
  };
}

@Injectable()
export class CustomContext extends TelegrafContext {
  session: SessionData;
  constructor(
    readonly update: Update,
    readonly telegram: Telegram,
    readonly botInfo: UserFromGetMe,
  ) {
    super(update, telegram, botInfo);
  }

  async sendCustomMessage(text: string, inline_keyboard: InlineKeyboardButton[][], message_id: number = this.from.id) {
    try {
      const message = await this.telegram.sendMessage(message_id, text, {
        parse_mode: 'HTML',
        //@ts-expect-error telegraf is stupid
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard,
        },
      });
      if (!this.session) {
        this.session = {};
      }
      this.session.message_id = message.message_id;
    } catch (error) {
      console.log('error', error);
    }
  }

  async editMessage(text: string, inline_keyboard: InlineKeyboardButton[][], message_id: number) {
    try {
      if (!this.session) {
        this.session = {};
      }

      message_id = this.session.message_id;

      if (!this.session.message_id) {
        // @ts-expect-error telegraf is stupid 2
        this.session.message_id = this.update.callback_query.message.message_id;
        message_id = this.session.message_id;
      }

      if (this.session.message_id) {
        await this.telegram.editMessageText(this.from.id, message_id, undefined, text, {
          parse_mode: 'HTML',
          //@ts-expect-error telegraf is stupid 3
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard,
          },
        });
      } else {
        this.sendCustomMessage(text, inline_keyboard);
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}
