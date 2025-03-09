import * as fs from 'fs';

import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

export const loadEnv = () => {
  let envPath: string | undefined;
  if (process.env.NODE_ENV) {
    const possiblePath = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
    // check if the file exists
    if (fs.existsSync(possiblePath)) {
      envPath = possiblePath;
    } else {
      Logger.warn(
        `loading default env vars - env file not found at ${possiblePath}`,
        'loadEnv',
      );
    }
  }

  dotenv.config({
    path: envPath,
  });
};
