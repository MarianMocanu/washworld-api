import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CarService } from 'src/car/car.service';
import { CreateCarDto } from 'src/car/dto/create-car.dto';

describe('Car Controller (e2e)', () => {
  let app: INestApplication;
  let carService: CarService;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    carService = moduleFixture.get<CarService>(CarService);

    // Sign up
    const userDTO = new CreateUserDto('test', 'user', 'testuser@mail.com', '12345');
    user = await userService.create(userDTO);

    // Log in
    const loginDTO = new LoginDto('test4@mail.com', '12345');
    const loginResponse = await authService.login(loginDTO);
    token = loginResponse.token;

    // Add a car
    // car = await carService.create({ plateNumber: 'AZ98765', name: 'Testcar', userId: 1 });

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/cars (GET)', () => {
    it('should return 200 and an array of cars', async () => {
      const response = await request(app.getHttpServer()).get('/cars').set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe('/cars/id (GET)', () => {
    it('should return a car based on its id', async () => {
      const newCar = new CreateCarDto();
      newCar.plateNumber = 'AB123CD';
      newCar.name = 'Testcar';
      newCar.userId = 1;

      const carCreated = await carService.create(newCar);

      const response = await request(app.getHttpServer())
        .get(`/cars/${carCreated.id}`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.plateNumber).toBe('AB123CD');

      await carService.remove(response.body.id);
    });
  });

  describe('/cars/user/id (GET)', () => {
    it('should return cars based on user id', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer())
        .get(`/cars/user/${userId}`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/cars (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidCar = { plateNumber: 12345 };
      const response = await request(app.getHttpServer())
        .post('/cars')
        .set('Authorization', token)
        .send(invalidCar);
      expect(response.statusCode).toBe(400);
    });

    it('should return 201 and the new car after creation', async () => {
      const newCar = {
        plateNumber: 'EF456GH',
        name: 'Testcar',
        userId: 1,
      };

      const response = await request(app.getHttpServer())
        .post('/cars')
        .set('Authorization', token)
        .send(newCar);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();

      // delete the car at the end of the test
      await carService.remove(response.body.id);
    });
  });

  afterAll(async () => {
    await userService.remove(user.id);
    await app.close();
  });
});
