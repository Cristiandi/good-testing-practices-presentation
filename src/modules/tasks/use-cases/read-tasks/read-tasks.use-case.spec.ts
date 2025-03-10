import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ReadTasksUseCase } from './read-tasks.use-case';

import appConfig from '../../../../configuration/app.config';

import { TaskRepository } from '../../task.repository';

type TaskRepositoryMockType = Partial<Record<keyof TaskRepository, jest.Mock>>;
const createMockTaskRepository = (): TaskRepositoryMockType => ({});

describe('ReadTaskUseCase', () => {
  let readTasksUseCase: ReadTasksUseCase;
  let taskRepository: TaskRepositoryMockType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig)],
      providers: [
        ReadTasksUseCase,
        {
          provide: TaskRepository,
          useValue: createMockTaskRepository(),
        },
      ],
    }).compile();

    readTasksUseCase = module.get(ReadTasksUseCase);
    taskRepository = module.get(TaskRepository);
  });

  it('readTasksUseCase should be defined', () => {
    expect(readTasksUseCase).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('should read tasks', async () => {
    const readTasksOutput = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Task 2 description',
      },
    ];

    taskRepository.readMany = jest.fn().mockResolvedValue(readTasksOutput);

    const tasks = await readTasksUseCase.execute({});

    expect(tasks).toBeDefined();
    expect(tasks).toBe(readTasksOutput);
  });
});
