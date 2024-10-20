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

  async sendCustomMessage(text: string, inline_keyboard: InlineKeyboardButton[][]) {
    try {
      const message = await this.telegram.sendMessage(this.chat.id, text, {
        parse_mode: 'HTML',
        link_preview_options: {
          is_disabled: true,
        },
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
        if ('callback_query' in this.update) {
          this.session.message_id = this.update.callback_query.message.message_id;
        }
        message_id = this.session.message_id;
      }

      if (this.session.message_id) {
        await this.telegram.editMessageText(this.chat.id, message_id, undefined, text, {
          parse_mode: 'HTML',
          link_preview_options: {
            is_disabled: true,
          },
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
