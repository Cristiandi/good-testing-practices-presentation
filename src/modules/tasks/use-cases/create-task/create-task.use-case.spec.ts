import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskUseCase } from './create-task.use-case';

import appConfig from '../../../../configuration/app.config';

import { TaskRepository } from '../../task.repository';

type TaskRepositoryMockType = Partial<Record<keyof TaskRepository, jest.Mock>>;
const createMockTaskRepository = (): TaskRepositoryMockType => ({});

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: TaskRepositoryMockType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig)],
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskRepository,
          useValue: createMockTaskRepository(),
        },
      ],
    }).compile();

    createTaskUseCase = module.get(CreateTaskUseCase);
    taskRepository = module.get(TaskRepository);
  });

  it('createTaskUseCase should be defined', () => {
    expect(createTaskUseCase).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskInput = {
      title: 'Task 1',
      description: 'Task 1 description',
    };

    taskRepository.create = jest.fn().mockResolvedValue(1);
    taskRepository.readOne = jest.fn().mockResolvedValue({
      id: 1,
      title: createTaskInput.title,
      description: createTaskInput.description,
    });

    const createdTask = await createTaskUseCase.execute({
      ...createTaskInput,
    });

    expect(createdTask).toBeDefined();
    if (createdTask) {
      expect(createdTask.title).toBe(createTaskInput.title);
      expect(createdTask.description).toBe(createTaskInput.description);
    }
  });
});
