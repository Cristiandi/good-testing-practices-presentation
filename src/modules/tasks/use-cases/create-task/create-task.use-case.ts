import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TaskRepository } from '../../task.repository';
import { ExecuteInput } from './execute.types';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: ExecuteInput) {
    const taskId = await this.taskRepository.create({
      title: input.title,
      description: input.description,
    });

    if (!taskId) {
      throw new InternalServerErrorException('task could not be created');
    }

    const createdTask = await this.taskRepository.readOne({
      task: { id: taskId },
    });

    return createdTask;
  }
}
