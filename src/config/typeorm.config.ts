import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TypeOrmModels } from 'src/config/entities.array';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: TypeOrmModels,
};

export const dataSource = new DataSource(databaseConfig as DataSourceOptions);
