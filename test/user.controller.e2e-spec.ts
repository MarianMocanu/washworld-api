//TBD
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;
  const userDTO = new CreateUserDto('John', 'Doe', 'mail@john.com', 'qwerty');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);

    // Sign up
    const userDTO = new CreateUserDto('test', 'user', 'testuser9@mail.com', '12345');
    user = await userService.create(userDTO);

    // Log in
    const loginDTO = new LoginDto('testuser9@mail.com', '12345');
    const loginResponse = await authService.login(loginDTO);
    token = loginResponse.token;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/auth/signup (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidUser = { ...userDTO, email: 222 };

      const response = await request(app.getHttpServer()).post('/auth/signup').send(invalidUser);

      expect(response.statusCode).toBe(400);
    });

    it('should return 201 and the new user after creation', async () => {
      const newUserDTO = new CreateUserDto('John', 'Doe', '1234@john.com', 'qwerty');
      const response = await request(app.getHttpServer()).post('/auth/signup').send(newUserDTO);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.firstName).toBe(userDTO.firstName);
      expect(response.body.id).toBeDefined();

      // delete the entry at the end of the test
      await userService.remove(response.body.id);
    });
  });

  describe('/user/:id (GET)', () => {
    it('should return 400 status code if user id is not a number', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/a123')
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User id is not a number');
    });

    it('should return 404 status code if user id not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/999999999')
        .set('Authorization', token);
      expect(response.statusCode).toBe(404);
    });

    it('should return 200 and the queried element', async () => {
      const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail@john.com', 'qwerty');
      const newUser = await userService.create(newUserDTO);

      const response = await request(app.getHttpServer())
        .get(`/user/${newUser.id}`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(newUser.id);
      expect(response.body.firstName).toBe(newUser.firstName);

      await userService.remove(newUser.id);
    });
  });

  describe('/user/:id (PATCH)', () => {
    it('should return 400 status code if user id is not a number', async () => {
      const response = await request(app.getHttpServer())
        .patch('/user/a9999999999')
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User id is not a number');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/user/999999')
        .set('Authorization', token);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    it('should return 400 status code if invalid data', async () => {
      const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail2@john.com', 'qwerty');
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
      const newUserDTO = new CreateUserDto('John', 'Doe', 'testemail3@john.com', 'qwerty');
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

  describe('/user/:id (DELETE)', () => {
    it('should return 400 status code if user id is not a number', async () => {
      const response = await request(app.getHttpServer())
        .delete('/user/a123')
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('User id is not a number');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/user/999999')
        .set('Authorization', token);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  afterAll(async () => {
    await userService.remove(user.id);
    await app.close();
  });
});
