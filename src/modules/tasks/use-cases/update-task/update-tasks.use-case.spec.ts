import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UpdateTaskUseCase } from './update-task.use-case';

import appConfig from '../../../../configuration/app.config';

import { TaskRepository } from '../../task.repository';

type TaskRepositoryMockType = Partial<Record<keyof TaskRepository, jest.Mock>>;
const createMockTaskRepository = (): TaskRepositoryMockType => ({});

describe('ReadTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepository: TaskRepositoryMockType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig)],
      providers: [
        UpdateTaskUseCase,
        {
          provide: TaskRepository,
          useValue: createMockTaskRepository(),
        },
      ],
    }).compile();

    updateTaskUseCase = module.get(UpdateTaskUseCase);
    taskRepository = module.get(TaskRepository);
  });

  it('updateTaskUseCase should be defined', () => {
    expect(updateTaskUseCase).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('should update task', async () => {
    const updateTaskOutput = {
      id: 1,
      title: 'Task 1',
      description: 'Task 1 description',
    };

    taskRepository.readOne = jest
      .fn()
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce(updateTaskOutput);
    taskRepository.update = jest.fn().mockResolvedValue(1);

    const task = await updateTaskUseCase.execute({
      id: 1,
      title: 'Task 1',
      description: 'Task 1 description',
    });

    expect(task).toBeDefined();
    expect(task).toEqual(updateTaskOutput);
  });

  it('should throw NotFoundException if task not found', async () => {
    taskRepository.readOne = jest.fn().mockResolvedValue(null);

    try {
      await updateTaskUseCase.execute({
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throw InternalServerErrorException if task not found after update', async () => {
    taskRepository.readOne = jest
      .fn()
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce(null);
    taskRepository.update = jest.fn().mockResolvedValue(0);

    try {
      await updateTaskUseCase.execute({
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
