import { AppDataSourceConfig } from './data-source';

export default () => ({
  env: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT || '10001', 10),
  database: {
    ...AppDataSourceConfig,
  },
});
