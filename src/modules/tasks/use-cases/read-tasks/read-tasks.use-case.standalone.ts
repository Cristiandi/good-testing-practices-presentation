import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../../../app.module';
import { ReadTasksUseCase } from './read-tasks.use-case';
import { Logger } from '@nestjs/common';

const label = 'readTasksUseCase.execute';

(async () => {
  // create the app context
  const app = await NestFactory.createApplicationContext(AppModule);

  const readTasksUseCase = app.get(ReadTasksUseCase);

  console.time(label);

  const existingTasks = await readTasksUseCase.execute({
    pagination: { take: 1, skip: 1 },
  });

  Logger.log(
    'existing tasks',
    existingTasks,
    'read-tasks.use-case.standalone.ts',
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
