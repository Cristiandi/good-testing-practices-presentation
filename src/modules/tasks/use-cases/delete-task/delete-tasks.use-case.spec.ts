import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DeleteTaskUseCase } from './delete-task.use-case';

import appConfig from '../../../../configuration/app.config';

import { TaskRepository } from '../../task.repository';
import { FlagsmithService } from '../../../../frameworks/flagsmith/flagsmith.service';
import { NotFoundException, NotImplementedException } from '@nestjs/common';

type TaskRepositoryMockType = Partial<Record<keyof TaskRepository, jest.Mock>>;
const createMockTaskRepository = (): TaskRepositoryMockType => ({});

type FlagsmithServiceMockType = Partial<
  Record<keyof FlagsmithService, jest.Mock>
>;
const createMockFlagsmithService = (): FlagsmithServiceMockType => ({});

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: TaskRepositoryMockType;
  let flagsmithService: FlagsmithServiceMockType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(appConfig)],
      providers: [
        DeleteTaskUseCase,
        {
          provide: TaskRepository,
          useValue: createMockTaskRepository(),
        },
        {
          provide: FlagsmithService,
          useValue: createMockFlagsmithService(),
        },
      ],
    }).compile();

    deleteTaskUseCase = module.get(DeleteTaskUseCase);
    taskRepository = module.get(TaskRepository);
    flagsmithService = module.get(FlagsmithService);
  });

  it('deleteTaskUseCase should be defined', () => {
    expect(deleteTaskUseCase).toBeDefined();
  });

  it('taskRepository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('flagsmithService should be defined', () => {
    expect(flagsmithService).toBeDefined();
  });

  it('should delete a task', async () => {
    flagsmithService.isFeatureEnabled = jest.fn().mockReturnValueOnce(true);
    taskRepository.readOne = jest.fn().mockResolvedValueOnce({ id: 1 });
    taskRepository.delete = jest.fn().mockResolvedValue(1);

    await deleteTaskUseCase.execute({
      id: 1,
    });

    expect(flagsmithService.isFeatureEnabled).toHaveBeenCalledWith(
      'enable_delete',
    );
    expect(taskRepository.delete).toHaveBeenCalledWith({
      task: { id: 1 },
    });
  });

  it('should throw NotImplementedException if delete task feature is not enabled', async () => {
    flagsmithService.isFeatureEnabled = jest.fn().mockReturnValueOnce(false);

    try {
      await deleteTaskUseCase.execute({
        id: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotImplementedException);
    }
  });

  it('should throw NotFoundException if task is not found', async () => {
    flagsmithService.isFeatureEnabled = jest.fn().mockReturnValueOnce(true);
    taskRepository.readOne = jest.fn().mockResolvedValueOnce(null);

    try {
      await deleteTaskUseCase.execute({
        id: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
