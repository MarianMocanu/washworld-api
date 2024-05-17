import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

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

  // TODO: AFTER SERVICES ARE IMPLEMENTED

  const connection = await AppDataSource.initialize();
  if (connection.isInitialized) {
    console.log('Seeding terminals');
    const locationRepository = connection.getRepository('Location');
    //   const servicesRepository = connection.getRepository('Service');
    // const terminalRepository = connection.getRepository('Terminal');
    const locations = locationRepository.find();

    if ((await locations).length) {
      console.log(locations);
    }
  }
  await connection.destroy();
}

seed();
