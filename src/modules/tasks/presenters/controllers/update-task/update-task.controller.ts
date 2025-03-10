import {
  Body,
  Controller,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateTaskUseCase } from '../../../use-cases/update-task/update-task.use-case';
import { ServeParamsInput, ServeBodyInput } from './serve.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: UpdateTaskUseCase) {}

  @Patch(':id')
  async serve(@Param() params: ServeParamsInput, @Body() body: ServeBodyInput) {
    return this.updateTaskUseCase.execute({
      id: +params.id,
      title: body.title,
      description: body.description,
      completed: body.completed,
    });
  }
}
