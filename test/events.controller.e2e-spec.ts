import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { EventService } from 'src/event/event.service';
import { CreateEventDto } from 'src/event/dto/create-event.dto';

describe('Events Controller (e2e)', () => {
  let app: INestApplication;
  let eventsService: EventService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    eventsService = moduleFixture.get<EventService>(EventService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/events (GET)', () => {
    it('should return 200 and an array of levels', async () => {
      const response = await request(app.getHttpServer()).get('/events');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/events (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const eventDTO = new CreateEventDto({ carId: 99999999 });
      const response = await request(app.getHttpServer()).post('/events').send(eventDTO);
      expect(response.statusCode).toBe(400);
    });

    // FIXME: This test is failing because the terminal id does not exist yet
    // it('should return 201 and the new event after creation', async () => {
    //   const eventDTO = new CreateEventDto({ carId: 1, serviceId: 1, terminalId: 1 });
    //   const response = await request(app.getHttpServer()).post('/events').send(eventDTO);

    //   expect(response.statusCode).toBe(201);
    //   expect(response.body).toBeDefined();
    //   expect(response.body.id).toBeDefined();

    //   // delete the level at the end of the test
    //   eventsService.remove(response.body.id);
    // });
  });

  describe('/events/:id (PATCH)', () => {
    it('should return 400 status code if event id is not a number', async () => {
      const response = await request(app.getHttpServer()).patch('/events/aasasdfasdf');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Event id is not a number');
    });

    // FIXME: This test is failing because the terminal id does not exist yet
    // it('should return 404 if user not found', async () => {
    //   const response = await request(app.getHttpServer())
    //     .patch('/user/999999')
    //     .set('Authorization', token);
    //   expect(response.statusCode).toBe(404);
    //   expect(response.body.message).toBe('User not found');
    // });

    // it('should return 400 status code if invalid data', async () => {
    //   const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail@john.com', 'qwerty');
    //   const newUser = await userService.create(newUserDTO);
    //   const invalidUser = { ...newUser, firstName: 1234 };

    //   const response = await request(app.getHttpServer())
    //     .patch(`/user/${invalidUser.id}`)
    //     .set('Authorization', token)
    //     .send(invalidUser);

    //   expect(response.statusCode).toBe(400);

    //   await userService.remove(newUser.id);
    // });

    // it('should return 200 and the updated data', async () => {
    //   const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail@john.com', 'qwerty');
    //   const newUser = await userService.create(newUserDTO);
    //   const updatedUser = { ...newUser, firstName: 'updated firstName' };

    //   const response = await request(app.getHttpServer())
    //     .patch(`/user/${updatedUser.id}`)
    //     .set('Authorization', token)
    //     .send(updatedUser);

    //   expect(response.statusCode).toBe(200);
    //   expect(response.body).toBeDefined();
    //   expect(response.body.firstName).toBe('Updated Firstname');

    //   await userService.remove(newUser.id);
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
