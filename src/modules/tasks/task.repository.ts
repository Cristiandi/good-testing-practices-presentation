import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(task: Partial<Task>): Promise<number | null> {
    const { identifiers } = await this.taskRepository.insert(task);

    if (!identifiers.length) {
      return null;
    }

    return identifiers[0].id as number;
  }

  async readOne(fields: {
    task: {
      id: number;
    };
  }): Promise<Task | null> {
    const query = this.taskRepository.createQueryBuilder('task');

    query.where('1 = 1');

    if (fields.task?.id) {
      query.where('task.id = :id', { id: fields.task.id });
    }

    const existingTask = await query.getOne();

    return existingTask || null;
  }

  async readMany(
    fields: {
      task?: {
        id?: {
          in?: number[];
          notIn?: number[];
        };
        title?: {
          like?: string;
        };
        description?: {
          like?: string;
        };
      };
    },
    pagination?: {
      take?: number;
      skip?: number;
    },
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    query.where('1 = 1');

    if (fields.task?.id?.in) {
      query.andWhere('task.id IN (:...ids)', { ids: fields.task.id.in });
    }

    if (fields.task?.id?.notIn) {
      query.andWhere('task.id NOT IN (:...ids)', { ids: fields.task.id.notIn });
    }

    if (fields.task?.title?.like) {
      query.andWhere('task.title LIKE :title', {
        title: `%${fields.task.title.like}%`,
      });
    }

    if (fields.task?.description?.like) {
      query.andWhere('task.description LIKE :description', {
        description: `%${fields.task.description.like}%`,
      });
    }

    if (pagination?.take) {
      query.take(pagination.take);
    }

    if (pagination?.skip) {
      query.skip(pagination.take);
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async update(task: Partial<Task>): Promise<number> {
    if (!task.id) {
      throw new Error('id is required');
    }

    const { affected } = await this.taskRepository.update(task.id, task);

    return affected || 0;
  }

  async delete(fields: {
    task: {
      id: number;
    };
  }): Promise<number> {
    const { affected } = await this.taskRepository.delete(fields.task.id);

    return affected || 0;
  }
}
