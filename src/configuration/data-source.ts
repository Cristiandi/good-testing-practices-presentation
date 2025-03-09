import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEnv } from './load-env';
import { getEnvVar } from '../utils/get-env-var.util';

loadEnv();

export const AppDataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: getEnvVar('DB_HOST', 'localhost'),
  port: Number(getEnvVar('DB_PORT', '5432')),
  username: getEnvVar('DB_USER', 'user'),
  password: getEnvVar('DB_PASSWORD', 'password'),
  database: getEnvVar('DB_NAME', 'dev_db'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: true,
  logging: true,
};

export const AppDataSource = new DataSource({
  ...AppDataSourceConfig,
});
