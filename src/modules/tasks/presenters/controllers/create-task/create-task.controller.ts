import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTaskUseCase } from '../../../use-cases/create-task/create-task.use-case';
import { ServeBodyInput } from './serve.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async createTask(@Body() body: ServeBodyInput) {
    return this.createTaskUseCase.execute(body);
  }
}
