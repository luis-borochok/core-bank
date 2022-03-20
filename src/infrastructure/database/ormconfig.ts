import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { get } from 'env-var';

// Initializing dotenv
config({ path: '.env' || '.env.dev' });

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: get('POSTGRES_URL').required().asString(),
  port: get('POSTGRES_PORT').required().asIntPositive(),
  username: get('POSTGRES_USER').required().asString(),
  password: get('POSTGRES_PASSWORD').required().asString(),
  database: get('POSTGRES_DB').required().asString(),
  entities: [],
  autoLoadEntities: true,
  connectTimeoutMS: 2000,
  logging: ['error', 'migration', 'schema'],
};
