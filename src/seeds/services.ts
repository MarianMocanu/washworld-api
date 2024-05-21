import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Service, ServiceType } from 'src/service/entities/service.entity';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';

dotenv.config();

const serviceSeeds: CreateServiceDto[] = [
  // price for auto service is the cost per wash, manual and vacuum are per minute of usage
  {
    type: ServiceType.auto,
    price: 40, // Basic
  },
  {
    type: ServiceType.auto,
    price: 79, // Gold
  },
  {
    type: ServiceType.auto,
    price: 99, // Premium
  },
  {
    type: ServiceType.auto,
    price: 109, // Premium Plus
  },
  {
    type: ServiceType.auto,
    price: 139, // All Inclusive
  },
  {
    type: ServiceType.self,
    price: 10,
  },
  {
    type: ServiceType.vacuum,
    price: 10,
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
    console.log('Seeding services');
    const serviceRepository = connection.getRepository<Service>('service');

    for (const [index, serviceSeed] of serviceSeeds.entries()) {
      const newService = serviceRepository.create(serviceSeed);
      const savedService = await serviceRepository.save(newService);
      console.log('Service', index + 1, JSON.stringify(savedService, null, 2));
    }
  }
  await connection.destroy();
}

seed();
