import { Injectable } from '@nestjs/common';

import { TaskRepository } from '../../task.repository';
import { ExecuteInput } from './execute.types';

@Injectable()
export class ReadTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: ExecuteInput) {
    const existingTasks = await this.taskRepository.readMany(
      {
        task: {
          description: {
            like: input.description,
          },
          title: {
            like: input.title,
          },
        },
      },
      input.pagination,
    );

    return existingTasks;
  }
}
