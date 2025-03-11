import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Flags, Flagsmith } from 'flagsmith-nodejs';
import { ConfigType } from '@nestjs/config';

import appConfig from '../../configuration/app.config';

@Injectable()
export class FlagsmithService implements OnModuleInit {
  private flagsmith: Flagsmith;

  private flags: Flags;

  constructor(
    @Inject(appConfig.KEY)
    protected readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  async onModuleInit() {
    this.flagsmith = new Flagsmith({
      environmentKey: this.appConfiguration.flagsmith.environmentKey,
    });

    this.flags = await this.flagsmith.getEnvironmentFlags();
  }

  isFeatureEnabled(featureName: string): boolean {
    return this.flags.isFeatureEnabled(featureName);
  }

  getFeatureValue(featureName: string): any {
    return this.flags.getFeatureValue(featureName);
  }
}
