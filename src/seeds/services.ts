import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const serviceSeeds = [
  // price for auto service is the subscription cost, manual and vacuum are per minute of usage
  {
    type: 'auto',
    price: '99',
  },
  {
    type: 'auto',
    price: '139',
  },
  {
    type: 'auto',
    price: '169',
  },
  {
    type: 'manual',
    price: '10',
  },
  {
    type: 'vacuum',
    price: '5',
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
    const serviceRepository = connection.getRepository('service');

    for (const serviceName of serviceSeeds) {
      const service = await serviceRepository.findOne({ where: { name: serviceName } });
      if (!service) {
        const newservice = serviceRepository.create({ name: serviceName });
        const savedservice = await serviceRepository.save(newservice);
        console.log('service seeded', savedservice);
      } else {
        console.log('service ALREADY seeded');
      }
    }
  }
  await connection.destroy();
}

seed();
