import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../../../app.module';
import { CreateTaskUseCase } from './create-task.use-case';
import { Logger } from '@nestjs/common';

const label = 'createTaskUseCase.execute';

(async () => {
  // create the app context
  const app = await NestFactory.createApplicationContext(AppModule);

  const createTaskUseCase = app.get(CreateTaskUseCase);

  console.time(label);

  const createdTask = await createTaskUseCase.execute({
    title: 'Task 1',
    description: 'Task 1 description',
  });

  Logger.log('created task', createdTask, 'create-task.use-case.standalone.ts');

  console.timeEnd(label);
})()
  .catch((error) => {
    console.timeEnd(label);
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
