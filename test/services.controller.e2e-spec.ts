import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ServiceService } from 'src/service/service.service';

describe('Service Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let serviceService: ServiceService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    serviceService = moduleFixture.get<ServiceService>(ServiceService);

    // Sign up
    const userDTO = new CreateUserDto('test', 'user', 'testuser6@mail.com', '12345');
    user = await userService.create(userDTO);

    // Log in
    const loginDTO = new LoginDto('testuser6@mail.com', '12345');
    const loginResponse = await authService.login(loginDTO);
    token = loginResponse.token;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/services (GET)', () => {
    it('should return 200 and an array of services', async () => {
      const response = await request(app.getHttpServer())
        .get('/services')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/service (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidService = { type: 'invalid', price: 'XD' };
      const response = await request(app.getHttpServer())
        .post('/services')
        .send(invalidService)
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
    });
  });
  afterAll(async () => {
    await userService.remove(user.id);
    await app.close();
  });
});
