import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { LocationsService } from 'src/locations/locations.service';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { Status } from 'src/locations/entities/location.entity';

describe('Location Controller (e2e)', () => {
  let app: INestApplication;
  let locationsService: LocationsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    locationsService = moduleFixture.get<LocationsService>(LocationsService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/locations (GET)', () => {
    it('should return 200 and an array of locations', async () => {
      const response = await request(app.getHttpServer()).get('/locations');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/locations/id (GET)', () => {
    it('should return a location based on its id', async () => {
      const newlocation = new CreateLocationDto({
        city: 'København',
        streetName: 'Nørrebrogade',
        streetNumber: '56',
        postalCode: '2200',
        openingHours: {
          monday: { from: '00:00', to: '24:00' },
          tuesday: { from: '00:00', to: '24:00' },
          wednesday: { from: '00:00', to: '24:00' },
          thursday: { from: '00:00', to: '24:00' },
          friday: { from: '00:00', to: '24:00' },
          saturday: { from: '00:00', to: '24:00' },
          sunday: { from: 'Closed', to: 'Closed' },
        },
        status: Status.closed,
        image: 'https://example.com/image3.jpg',
        coordinates: {
          latitude: 55.6887,
          longitude: 12.5489,
        },
      });

      const locationCreated = await locationsService.create(newlocation);

      const response = await request(app.getHttpServer()).get(`/locations/${locationCreated.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.address).toBe('2200 København, Nørrebrogade 56');
    });
  });

  describe('/locations (POST)', () => {
    it('should return 400 status code if invalid data', async () => {
      const invalidLocation = { address: false };
      const response = await request(app.getHttpServer()).post('/locations').send(invalidLocation);
      expect(response.statusCode).toBe(400);
    });

    it('should return 201 and the new location after creation', async () => {
      const newLocation = {
        address: 'Nørrebrogade 56, 2200 København',
        city: 'København',
        streetName: 'Nørrebrogade',
        streetNumber: '56',
        postalCode: '2200',
        openingHours: {
          monday: { from: '00:00', to: '24:00' },
          tuesday: { from: '00:00', to: '24:00' },
          wednesday: { from: '00:00', to: '24:00' },
          thursday: { from: '00:00', to: '24:00' },
          friday: { from: '00:00', to: '24:00' },
          saturday: { from: '00:00', to: '24:00' },
          sunday: { from: 'Closed', to: 'Closed' },
        },
        status: 'closed',
        image: 'https://example.com/image3.jpg',
        coordinates: {
          latitude: 55.6887,
          longitude: 12.5489,
        },
      };

      const response = await request(app.getHttpServer()).post('/locations').send(newLocation);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();

      // delete the location at the end of the test
      await locationsService.remove(response.body.id);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
