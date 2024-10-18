declare global {
  namespace NodeJS {
    export class ProcessEnv {
      TOKEN: string;
      NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION';
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: number;
      POSTGRES_HOST: string;
      DEBUG_LOG: string;
    }
  }
}

export {};
