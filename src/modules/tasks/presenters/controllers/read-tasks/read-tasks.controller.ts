import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ReadTasksUseCase } from '../../../use-cases/read-tasks/read-tasks.use-case';
import { ServeQueryInput } from './serve.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class ReadTasksController {
  constructor(private readonly readTasksUseCase: ReadTasksUseCase) {}

  @Get()
  async serve(@Query() query: ServeQueryInput) {
    return this.readTasksUseCase.execute({
      title: query.title,
      description: query.description,
      pagination: {
        take: query.take ? parseInt(query.take, 10) : undefined,
        skip: query.skip ? parseInt(query.skip, 10) : undefined,
      },
    });
  }
}
