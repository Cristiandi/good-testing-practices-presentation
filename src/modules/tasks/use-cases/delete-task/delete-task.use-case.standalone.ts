import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../../../app.module';
import { DeleteTaskUseCase } from './delete-task.use-case';

const label = 'deleteTaskUseCase.execute';

(async () => {
  // create the app context
  const app = await NestFactory.createApplicationContext(AppModule);

  const deleteTaskUseCase = app.get(DeleteTaskUseCase);

  console.time(label);

  await deleteTaskUseCase.execute({
    id: 1,
  });

  console.timeEnd(label);
})()
  .catch((error) => {
    console.timeEnd(label);
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
