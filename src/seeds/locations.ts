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
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140211%2F2-1.png&w=3840&q=50',
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
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140220%2FIkke-navngivet-1-4.png&w=3840&q=50',
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
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140216%2F5.png&w=3840&q=50',
    coordinates: {
      latitude: 55.6777,
      longitude: 12.5978,
    },
  },
  {
    city: 'Amager',
    streetName: 'Englandsvej',
    streetNumber: '337',
    postalCode: '2770',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.available,
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140219%2F2-vask.png&w=1920&q=50',
    coordinates: {
      latitude: 55.6566,
      longitude: 12.6305,
    },
  },
  {
    city: 'Ishøj',
    streetName: 'Store Torv',
    streetNumber: '1',
    postalCode: '2635',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.available,
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140211%2F2-1.png&w=3840&q=50',
    coordinates: {
      latitude: 55.6158,
      longitude: 12.3494,
    },
  },
  {
    city: 'Greve',
    streetName: 'Hovedgaden',
    streetNumber: '371',
    postalCode: '2670',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.available,
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140211%2F2-1.png&w=3840&q=50',
    coordinates: {
      latitude: 55.5843,
      longitude: 12.2989,
    },
  },
  {
    city: 'Taastrup',
    streetName: 'Hovedgaden',
    streetNumber: '630',
    postalCode: '2630',
    openingHours: {
      monday: { from: '00:00', to: '24:00' },
      tuesday: { from: '00:00', to: '24:00' },
      wednesday: { from: '00:00', to: '24:00' },
      thursday: { from: '00:00', to: '24:00' },
      friday: { from: '00:00', to: '24:00' },
      saturday: { from: '00:00', to: '24:00' },
      sunday: { from: 'Closed', to: 'Closed' },
    },
    status: LocationStatus.available,
    image:
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140216%2F5.png&w=3840&q=50',
    coordinates: {
      latitude: 55.6568,
      longitude: 12.2927,
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
