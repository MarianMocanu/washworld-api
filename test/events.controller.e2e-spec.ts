import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { EventService } from 'src/event/event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { InvoicesService } from 'src/invoices/invoices.service';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

describe('Events Controller (e2e)', () => {
  let app: INestApplication;
  let invoicesService: InvoicesService;
  let eventsService: EventService;
  let carService: CarService;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;
  let car: Car;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    eventsService = moduleFixture.get<EventService>(EventService);
    invoicesService = moduleFixture.get<InvoicesService>(InvoicesService);
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
    car = await carService.create({ plateNumber: 'AZ98765', name: 'Testcar', userId: 1 });

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/events (GET)', () => {
    it('should return 200 and an array of levels', async () => {
      const response = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 400 status code if ID is not a string', async () => {
      const response = await request(app.getHttpServer())
        .get('/events/a99')
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('/events (POST)', () => {
    it('should return 404 status code if IDs are not found', async () => {
      const eventDTO = new CreateEventDto(9999, 9999, 9999);
      const response = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', token)
        .send(eventDTO);
      expect(response.statusCode).toBe(404);
    });

    it('should return 201 and the new event after creation', async () => {
      const eventDTO = new CreateEventDto(1, 1, 1);
      const response = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', token)
        .send(eventDTO);
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();

      // delete the invoice and event at the end of the test
      await invoicesService.removeByEventId(response.body.id);
      await eventsService.remove(response.body.id);
    });
  });

  describe('/events/:id (PATCH)', () => {
    it('should return 400 status code if event id is not a number', async () => {
      const response = await request(app.getHttpServer())
        .patch('/events/aasasdfasdf')
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Event id is not a number');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/user/999999')
        .set('Authorization', token);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    it('should return 400 status code if invalid data', async () => {
      const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail@john.com', 'qwerty');
      const newUser = await userService.create(newUserDTO);
      const invalidUser = { ...newUser, firstName: 1234 };

      const response = await request(app.getHttpServer())
        .patch(`/user/${invalidUser.id}`)
        .set('Authorization', token)
        .send(invalidUser);

      expect(response.statusCode).toBe(400);

      await userService.remove(newUser.id);
    });

    it('should return 200 and the updated data', async () => {
      const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail@john.com', 'qwerty');
      const newUser = await userService.create(newUserDTO);
      const updatedUser = { ...newUser, firstName: 'updated firstName' };

      const response = await request(app.getHttpServer())
        .patch(`/user/${updatedUser.id}`)
        .set('Authorization', token)
        .send(updatedUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.firstName).toBe('Updated Firstname');

      await userService.remove(newUser.id);
    });
  });

  afterAll(async () => {
    await carService.remove(car.id);
    await userService.remove(user.id);
    await app.close();
  });
});
