import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LevelsService } from 'src/levels/levels.service';

describe('Level Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;
  let levelsService: LevelsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    levelsService = moduleFixture.get<LevelsService>(LevelsService);

    // Sign up
    const userDTO = new CreateUserDto('test', 'user', 'testuser4@mail.com', '12345');
    user = await userService.create(userDTO);

    // Log in
    const loginDTO = new LoginDto('testuser4@mail.com', '12345');
    const loginResponse = await authService.login(loginDTO);
    token = loginResponse.token;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // FIXME SEND JWT TOKEN
  describe('/levels (GET)', () => {
    it('should return 200 and an array of levels', async () => {
      const response = await request(app.getHttpServer())
        .get('/levels')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/levels (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidLevel = { name: false };
      const response = await request(app.getHttpServer())
        .post('/levels')
        .send(invalidLevel)
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
    });

    it('should return 201 and the new level after creation', async () => {
      const response = await request(app.getHttpServer())
        .post('/levels')
        .send({ name: 'TestLevel', price: 1234 })
        .set('Authorization', token);
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();

      // delete the level at the end of the test
      await levelsService.remove(response.body.id);
    });
  });

  afterAll(async () => {
    await userService.remove(user.id);
    await app.close();
  });
});
