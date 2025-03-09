import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { TaskRepository } from '../../task.repository';
import { ExecuteInput } from './execute.types';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: ExecuteInput) {
    const existingTask = await this.taskRepository.readOne({
      task: {
        id: input.id,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`task with id ${input.id} not found`);
    }

    const affectedTasks = await this.taskRepository.update({
      id: input.id,
      title: input.title,
      description: input.description,
      completed: input.completed,
    });

    Logger.log(`updated ${affectedTasks} task`, 'UpdateTaskUseCase');

    const updatedTask = await this.taskRepository.readOne({
      task: {
        id: input.id,
      },
    });

    if (!updatedTask) {
      throw new InternalServerErrorException(
        `task with id ${input.id} not found`,
      );
    }

    return updatedTask;
  }
}
