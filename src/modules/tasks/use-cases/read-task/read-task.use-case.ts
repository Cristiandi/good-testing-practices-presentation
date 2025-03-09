import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from '../../task.repository';
import { ExecuteInput } from './execute.types';

@Injectable()
export class ReadTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: ExecuteInput) {
    const existingTask = await this.taskRepository.readOne({
      task: { id: input.id },
    });

    if (!existingTask) {
      throw new NotFoundException(`task with id ${input.id} not found`);
    }

    return existingTask;
  }
}
