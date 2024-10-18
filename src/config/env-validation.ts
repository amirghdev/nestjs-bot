import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, validateSync } from 'class-validator';

enum Environment {
  Development = 'DEVELOPMENT',
  Production = 'PRODUCTION',
}

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  TOKEN: string;

  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsNotEmpty()
  POSTGRES_HOST: string | number;

  @IsNotEmpty()
  DEBUG_LOG: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
