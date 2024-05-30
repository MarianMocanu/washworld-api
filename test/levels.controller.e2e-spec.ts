import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { LevelsService } from 'src/levels/levels.service';

describe('Level Controller (e2e)', () => {
  let app: INestApplication;
  let levelsService: LevelsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    levelsService = moduleFixture.get<LevelsService>(LevelsService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // FIXME SEND JWT TOKEN
  // describe('/levels (GET)', () => {
  //   it('should return 200 and an array of levels', async () => {
  //     const response = await request(app.getHttpServer()).get('/levels');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBeDefined();
  //     expect(Array.isArray(response.body)).toBe(true);
  //   });
  // });

  // describe('/levels (POST)', () => {
  //   it('should return 400 status code if invalid data', async () => {
  //     const invalidLevel = { name: false };
  //     const response = await request(app.getHttpServer()).post('/levels').send(invalidLevel);
  //     expect(response.statusCode).toBe(400);
  //   });

  //   it('should return 201 and the new level after creation', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/levels')
  //       .send({ name: 'TestLevel' });

  //     expect(response.statusCode).toBe(201);
  //     expect(response.body).toBeDefined();
  //     expect(response.body.id).toBeDefined();

  //     // delete the level at the end of the test
  //     await levelsService.remove(response.body.id);
  //   });
  // });

  // afterAll(async () => {
  //   await app.close();
  // });
});
