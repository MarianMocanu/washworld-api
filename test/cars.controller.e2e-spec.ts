import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CarService } from 'src/car/car.service';
import { CreateCarDto } from 'src/car/dto/create-car.dto';

describe('Car Controller (e2e)', () => {
  let app: INestApplication;
  let carService: CarService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    carService = moduleFixture.get<CarService>(CarService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/cars (GET)', () => {
    it('should return 200 and an array of cars', async () => {
      const response = await request(app.getHttpServer()).get('/cars');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  //   describe('/cars/id (GET)', () => {
  //     it('should return a car based on its id', async () => {
  //       const newCar = new CreateCarDto();
  //       newCar.plateNumber = 'AB123CD';
  //       newCar.userId = 1;
  //       newCar.subscriptionId = 1;

  //       const carCreated = await carService.create(newCar);

  //       const response = await request(app.getHttpServer()).get(`/cars/${carCreated.id}`);

  //       expect(response.statusCode).toBe(200);
  //       expect(response.body).toBeDefined();
  //       expect(response.body.plateNumber).toBe('AB123CD');
  //     });
  //   });

  describe('/cars/user/id (GET)', () => {
    it('should return cars based on user id', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer()).get(`/cars/user/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/cars (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidCar = { plateNumber: 12345 };
      const response = await request(app.getHttpServer()).post('/cars').send(invalidCar);
      expect(response.statusCode).toBe(400);
    });

    // it('should return 201 and the new car after creation', async () => {
    //   const newCar = {
    //     plateNumber: 'EF456GH',
    //     userId: 2,
    //     subscriptionId: 3,
    //   };

    //   const response = await request(app.getHttpServer()).post('/cars').send(newCar);

    //   expect(response.statusCode).toBe(201);
    //   expect(response.body).toBeDefined();
    //   expect(response.body.id).toBeDefined();

    //   // delete the car at the end of the test
    //   await carService.remove(response.body.id);
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
