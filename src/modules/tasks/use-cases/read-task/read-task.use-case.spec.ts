import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ReadTaskUseCase } from './read-task.use-case';

import appConfig from '../../../../configuration/app.config';

import { TaskRepository } from '../../task.repository';
import { NotFoundException } from '@nestjs/common';

type TaskRepositoryMockType = Partial<Record<keyof TaskRepository, jest.Mock>>;
const createMockTaskRepository = (): TaskRepositoryMockType => ({});

describe('ReadTaskUseCase', () => {
  let readTaskUseCase: ReadTaskUseCase;
  let taskRepository: TaskRepositoryMockType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig)],
      providers: [
        ReadTaskUseCase,
        {
          provide: TaskRepository,
          useValue: createMockTaskRepository(),
        },
      ],
    }).compile();

    readTaskUseCase = module.get(ReadTaskUseCase);
    taskRepository = module.get(TaskRepository);
  });

  it('readTaskUseCase should be defined', () => {
    expect(readTaskUseCase).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('should read a task', async () => {
    const taskId = 1;
    const readTaskOutput = {
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    };

    taskRepository.readOne = jest.fn().mockResolvedValue(readTaskOutput);

    const readTask = await readTaskUseCase.execute({
      id: taskId,
    });

    expect(readTask).toBeDefined();
    if (readTask) {
      expect(readTask.id).toBe(taskId);
      expect(readTask.title).toBe(readTaskOutput.title);
      expect(readTask.description).toBe(readTaskOutput.description);
    }
  });

  it('should throw an error if task does not exist', async () => {
    const taskId = 1;

    taskRepository.readOne = jest.fn().mockResolvedValue(null);

    try {
      await readTaskUseCase.execute({
        id: taskId,
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
