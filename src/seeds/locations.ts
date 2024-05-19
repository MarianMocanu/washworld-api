import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';
import { Location, LocationStatus } from 'src/locations/entities/location.entity';
dotenv.config();

const locationSeeds: CreateLocationDto[] = [
  {
    city: 'København',
    streetName: 'Rådhuspladsen',
    streetNumber: '1',
    postalCode: '1550',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: '08:00', to: '24:00' },
    },
    status: LocationStatus.available,
    image: 'https://example.com/image1.jpg',
    coordinates: {
      latitude: 55.6761,
      longitude: 12.5683,
    },
  },
  {
    city: 'København',
    streetName: 'Vesterbrogade',
    streetNumber: '3A',
    postalCode: '1620',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.maintenance,
    image: 'https://example.com/image2.jpg',
    coordinates: {
      latitude: 55.6736,
      longitude: 12.57,
    },
  },
  {
    city: 'København',
    streetName: 'Strandgade',
    streetNumber: '93',
    postalCode: '1401',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.closed,
    image: 'https://example.com/image3.jpg',
    coordinates: {
      latitude: 55.6777,
      longitude: 12.5978,
    },
  },
];

async function seed() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
  });

  const connection = await AppDataSource.initialize();
  if (connection.isInitialized) {
    console.log('Seeding locations');
    const locationRepository = connection.getRepository<Location>('Location');

    for (const [index, locationSeed] of locationSeeds.entries()) {
      const newLocation = locationRepository.create(locationSeed);
      const savedLocation = await locationRepository.save(newLocation);
      console.log('Location', index + 1, JSON.stringify(savedLocation, null, 2));
    }
  }
  await connection.destroy();
}

seed();
