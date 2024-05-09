import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const levelSeeds = ['Basic', 'Gold', 'Premium', 'Premium Plus', 'All Inclusive'];

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
    console.log('Seeding levels');
    const levelRepository = connection.getRepository('Level');

    for (const levelName of levelSeeds) {
      const level = await levelRepository.findOne({ where: { name: levelName } });
      if (!level) {
        const newLevel = levelRepository.create({ name: levelName });
        const savedLevel = await levelRepository.save(newLevel);
        console.log('Level seeded', savedLevel);
      } else {
        console.log('Level ALREADY seeded');
      }
    }
  }
  await connection.destroy();
}

seed();
