import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { getApp, closeApp } from '../../../test/setup';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let createdTaskId: number;

  beforeAll(async () => {
    app = await getApp();
  });

  afterAll(async () => {
    await closeApp();
  });

  it('/tasks (POST)', async () => {
    const body = {
      title: 'Test task',
      description: 'Test description',
    };

    const response: request.Response = await request(app.getHttpServer())
      .post('/tasks')
      .send(body);

    const status = response.status;

    expect(status).toBe(201);

    const result: { id: number } = response.body;

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: body.title,
        description: body.description,
        completed: expect.any(Boolean),
      }),
    );

    createdTaskId = result.id;
  });

  it('/tasks/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/tasks/${createdTaskId}`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdTaskId,
        completed: false,
      }),
    );
  });

  it('/tasks (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/tasks');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          completed: expect.any(Boolean),
        }),
      ]),
    );
  });

  it('/tasks/:id (PATCH)', async () => {
    const body = {
      title: 'Updated task',
      description: 'Updated description',
      completed: true,
    };

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .send(body);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdTaskId,
        title: body.title,
        description: body.description,
        completed: body.completed,
      }),
    );
  });
});
