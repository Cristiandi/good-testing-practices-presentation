import {
  Injectable,
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';

import { TaskRepository } from '../../task.repository';
import { FlagsmithService } from '../../../../frameworks/flagsmith/flagsmith.service';
import { ExecuteInput } from './execute.types';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly flagsmithService: FlagsmithService,
  ) {}

  async execute(input: ExecuteInput) {
    const isFeatureEnabled =
      this.flagsmithService.isFeatureEnabled('enable_delete');

    if (!isFeatureEnabled) {
      throw new NotImplementedException('delete task feature is not enabled');
    }

    const existingTask = await this.taskRepository.readOne({
      task: {
        id: input.id,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`task with id ${input.id} not found`);
    }

    const affectedTasks = await this.taskRepository.delete({
      task: {
        id: input.id,
      },
    });

    Logger.log(`deleted ${affectedTasks} task`, 'UpdateTaskUseCase');
  }
}
