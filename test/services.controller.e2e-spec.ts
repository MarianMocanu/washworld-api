import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { ServiceService } from 'src/service/service.service';

describe('Service Controller (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let serviceService: ServiceService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    serviceService = moduleFixture.get<ServiceService>(ServiceService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/services (GET)', () => {
    it('should return 200 and an array of services', async () => {
      const response = await request(app.getHttpServer()).get('/services');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/service (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidService = { type: 'invalid', price: 'XD' };
      const response = await request(app.getHttpServer()).post('/services').send(invalidService);
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
