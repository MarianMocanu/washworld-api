import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { TerminalService } from 'src/terminal/terminal.service';

describe('Terminal Controller (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let terminalService: TerminalService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    terminalService = moduleFixture.get<TerminalService>(TerminalService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // describe('/terminals (GET)', () => {
  //   it('should return 200 and an array of terminals', async () => {
  //     const response = await request(app.getHttpServer()).get('/terminals');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toBeDefined();
  //     expect(Array.isArray(response.body)).toBe(true);
  //   });
  // });

  // describe('/terminals (POST)', () => {
  //   it('should return 400 status code if invalid data', async () => {
  //     const invalidTerminal = { status: 'invalid', location: 'XD' };
  //     const response = await request(app.getHttpServer()).post('/terminals').send(invalidTerminal);
  //     expect(response.statusCode).toBe(400);
  //   });

  // TODO: when we have locations and events
  // it('should return 201 and the new terminal after creation', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/terminal')
  //     .send({ status: 'idle', location: 1 });

  //   console.log(response.body);
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toBeDefined();
  //   expect(response.body.id).toBeDefined();

  //   // delete the terminal at the end of the test
  //   await terminalService.remove(response.body.id);
  // });
  // });

  //   afterAll(async () => {
  //     await app.close();
  //   });
});
