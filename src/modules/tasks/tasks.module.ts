import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskUseCase } from './use-cases/create-task/create-task.use-case';
import { ReadTaskUseCase } from './use-cases/read-task/read-task.use-case';
import { ReadTasksUseCase } from './use-cases/read-tasks/read-tasks.use-case';

import appConfig from '../../configuration/app.config';
import { UpdateTaskUseCase } from './use-cases/update-task/update-task.use-case';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [],
  providers: [
    TaskRepository,
    CreateTaskUseCase,
    ReadTaskUseCase,
    ReadTasksUseCase,
    UpdateTaskUseCase,
  ],
  exports: [CreateTaskUseCase],
})
export class TasksModule {}
