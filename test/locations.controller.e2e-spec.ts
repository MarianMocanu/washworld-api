import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LocationStatus } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/locations.service';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

describe('Location Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let token: string;
  let user: User;
  let locationsService: LocationsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
    locationsService = moduleFixture.get<LocationsService>(LocationsService);

    // Sign up
    const userDTO = new CreateUserDto('test', 'user', 'testuser5@mail.com', '12345');
    user = await userService.create(userDTO);

    // Log in
    const loginDTO = new LoginDto('testuser5@mail.com', '12345');
    const loginResponse = await authService.login(loginDTO);
    token = loginResponse.token;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // FIXME SEND JWT TOKEN
  describe('/locations (GET)', () => {
    it('should return 200 and an array of locations', async () => {
      const response = await request(app.getHttpServer())
        .get('/locations')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/locations/id (GET)', () => {
    it('should return a location based on its id', async () => {
      const newLocation = new CreateLocationDto(
        'København',
        'Nørrebrogade',
        '56',
        '2200',
        {
          monday: { from: '00:00', to: '24:00' },
          tuesday: { from: '00:00', to: '24:00' },
          wednesday: { from: '00:00', to: '24:00' },
          thursday: { from: '00:00', to: '24:00' },
          friday: { from: '00:00', to: '24:00' },
          saturday: { from: '00:00', to: '24:00' },
          sunday: { from: 'Closed', to: 'Closed' },
        },
        LocationStatus.closed,
        'https://example.com/image3.jpg',
        {
          latitude: 55.6887,
          longitude: 12.5489,
        },
      );

      const locationCreated = await locationsService.create(newLocation);

      const response = await request(app.getHttpServer())
        .get(`/locations/${locationCreated.id}`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.address).toBe('2200 København, Nørrebrogade 56');

      // delete the location at the end of the test
      await locationsService.remove(response.body.id);
    });
  });

  describe('/locations (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidLocation = { address: false };
      const response = await request(app.getHttpServer())
        .post('/locations')
        .send(invalidLocation)
        .set('Authorization', token);
      expect(response.statusCode).toBe(400);
    });

    it('should return 201 and the new location after creation', async () => {
      const newLocation = new CreateLocationDto(
        'København',
        'Nørrebrogade',
        '56',
        '2200',
        {
          monday: { from: '00:00', to: '24:00' },
          tuesday: { from: '00:00', to: '24:00' },
          wednesday: { from: '00:00', to: '24:00' },
          thursday: { from: '00:00', to: '24:00' },
          friday: { from: '00:00', to: '24:00' },
          saturday: { from: '00:00', to: '24:00' },
          sunday: { from: 'Closed', to: 'Closed' },
        },
        LocationStatus.closed,
        'https://example.com/image3.jpg',
        {
          latitude: 55.6887,
          longitude: 12.5489,
        },
      );

      const response = await request(app.getHttpServer())
        .post('/locations')
        .send(newLocation)
        .set('Authorization', token);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();

      // delete the location at the end of the test
      await locationsService.remove(response.body.id);
    });
  });

  afterAll(async () => {
    await userService.remove(user.id);
    await app.close();
  });
});
