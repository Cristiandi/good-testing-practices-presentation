import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

import { CreateTaskUseCase } from './use-cases/create-task/create-task.use-case';
import { ReadTaskUseCase } from './use-cases/read-task/read-task.use-case';
import { ReadTasksUseCase } from './use-cases/read-tasks/read-tasks.use-case';

import { UpdateTaskUseCase } from './use-cases/update-task/update-task.use-case';
import { CreateTaskController } from './presenters/controllers/create-task/create-task.controller';
import { ReadTaskController } from './presenters/controllers/read-task/read-task.controller';
import { ReadTasksController } from './presenters/controllers/read-tasks/read-tasks.controller';
import { UpdateTaskController } from './presenters/controllers/update-task/update-task.controller';

import appConfig from '../../configuration/app.config';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [
    TaskRepository,
    CreateTaskUseCase,
    ReadTaskUseCase,
    ReadTasksUseCase,
    UpdateTaskUseCase,
  ],
  controllers: [
    CreateTaskController,
    ReadTaskController,
    ReadTasksController,
    UpdateTaskController,
  ],
  exports: [
    CreateTaskUseCase,
    ReadTaskUseCase,
    ReadTasksUseCase,
    UpdateTaskUseCase,
  ],
})
export class TasksModule {}
