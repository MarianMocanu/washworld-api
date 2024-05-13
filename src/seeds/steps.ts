import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const stepSeeds = [
  { name: 'Car Soap', order: 1, description: 'This is step 1' },
  { name: 'Drying', order: 2, description: 'This is step 2' },
  { name: 'Brush wash', order: 3, description: 'This is step 3' },
  { name: 'High pressure rinse', order: 4, description: 'This is step 4' },
  { name: 'Wheel wash', order: 5, description: 'This is step 5' },
  { name: 'Rinse wax', order: 6, description: 'This is step 6' },
  { name: 'Undervarriage wash', order: 7, description: 'This is step 7' },
  { name: 'Polishing', order: 8, description: 'This is step 8' },
  { name: 'Insect repellent', order: 9, description: 'This is step 9' },
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
    console.log('Seeding steps');
    const stepRepository = connection.getRepository('Step');

    for (const stepSeed of stepSeeds) {
      const step = await stepRepository.findOne({ where: { name: stepSeed.name } });
      if (!step) {
        const newStep = stepRepository.create(stepSeed);
        const savedStep = await stepRepository.save(newStep);
        console.log('Step seeded', savedStep);
      } else {
        console.log('Step ALREADY seeded');
      }
    }
  }
  await connection.destroy();
}

seed();
