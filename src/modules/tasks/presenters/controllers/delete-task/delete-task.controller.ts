import {
  Controller,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { DeleteTaskUseCase } from '../../../use-cases/delete-task/delete-task.use-case';
import { ServeParamsInput } from './serve.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete(':id')
  async serve(@Param() params: ServeParamsInput) {
    return this.deleteTaskUseCase.execute({ id: +params.id });
  }
}
