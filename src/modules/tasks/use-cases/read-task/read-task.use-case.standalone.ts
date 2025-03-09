import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../../../app.module';
import { ReadTaskUseCase } from './read-task.use-case';
import { Logger } from '@nestjs/common';

const label = 'readTaskUseCase.execute';

(async () => {
  // create the app context
  const app = await NestFactory.createApplicationContext(AppModule);

  const readTaskUseCase = app.get(ReadTaskUseCase);

  console.time(label);

  const existingTask = await readTaskUseCase.execute({
    id: 1,
  });

  Logger.log(
    'existing task',
    existingTask,
    'create-task.use-case.standalone.ts',
  );

  console.timeEnd(label);
})()
  .catch((error) => {
    console.timeEnd(label);
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
