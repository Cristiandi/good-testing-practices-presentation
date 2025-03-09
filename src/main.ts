import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the port env var
  const PORT = configService.get<number>('port');

  // getting the environment var
  const ENV = configService.get<string>('env');

  await app.listen(PORT || 3000, () => {
    Logger.log(`app listening at ${PORT} in ${ENV}.`, 'main.ts');
  });
}

bootstrap().catch((err) => {
  Logger.error('Error starting app', 'main.ts');
  Logger.error(err, 'main.ts');
});
