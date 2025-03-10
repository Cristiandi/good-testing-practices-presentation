import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ReadTaskUseCase } from '../../../use-cases/read-task/read-task.use-case';
import { ServeParamsInput } from './serve.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('tasks')
export class ReadTaskController {
  constructor(private readonly readTaskUseCase: ReadTaskUseCase) {}

  @Get(':id')
  async serve(@Param() params: ServeParamsInput) {
    return this.readTaskUseCase.execute({
      id: +params.id,
    });
  }
}
