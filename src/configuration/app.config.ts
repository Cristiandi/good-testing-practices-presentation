import { registerAs } from '@nestjs/config';

import { AppDataSourceConfig } from './data-source';

export default registerAs('config', () => ({
  env: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT || '10001', 10),
  database: {
    ...AppDataSourceConfig,
  },
  flagsmith: {
    environmentKey: process.env.FLAGSMITH_ENVIRONMENT_KEY,
  },
}));
