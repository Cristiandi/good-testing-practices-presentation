import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FlagsmithService } from './flagsmith.service';

import appConfig from '../../configuration/app.config';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [FlagsmithService],
  exports: [FlagsmithService],
})
export class FlagsmithModule {}
