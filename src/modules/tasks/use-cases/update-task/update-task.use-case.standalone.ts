import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../../../app.module';
import { UpdateTaskUseCase } from './update-task.use-case';
import { Logger } from '@nestjs/common';

const label = 'updateTaskUseCase.execute';

(async () => {
  // create the app context
  const app = await NestFactory.createApplicationContext(AppModule);

  const updateTaskUseCase = app.get(UpdateTaskUseCase);

  console.time(label);

  const updatedTask = await updateTaskUseCase.execute({
    id: 1,
    title: 'Task 1 updated',
    description: 'Task 1 description updated',
    completed: true,
  });

  Logger.log('updated task', updatedTask, 'update-task.use-case.standalone');

  console.timeEnd(label);
})()
  .catch((error) => {
    console.timeEnd(label);
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
