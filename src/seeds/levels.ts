import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { CreateLevelDto } from 'src/levels/dto/create-level.dto';
import { Level } from 'src/levels/entities/level.entity';
import { Service, ServiceType } from 'src/service/entities/service.entity';

dotenv.config();

// prices in kr per month
const levelSeeds: CreateLevelDto[] = [
  { name: 'Basic', price: 99 },
  { name: 'Gold', price: 139 },
  { name: 'Premium', price: 169 },
  { name: 'Premium Plus', price: 179 },
  { name: 'All Inclusive', price: 229 },
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
    console.log('Seeding levels');

    const levelRepository = connection.getRepository<Level>('Level');
    const serviceRepository = connection.getRepository<Service>('Service');

    for (const [index, levelSeed] of levelSeeds.entries()) {
      const level = await levelRepository.findOne({ where: { name: levelSeed.name } });
      if (!level) {
        const newLevel = levelRepository.create(levelSeed);
        const savedLevel = await levelRepository.save(newLevel);
        console.log('Level', index + 1, JSON.stringify(savedLevel, null, 2));
      }
    }

    const automatedServices: Service[] = await serviceRepository.find({
      where: { type: ServiceType.auto },
      order: { price: 'ASC' },
    });

    for (const [index, service] of automatedServices.entries()) {
      service.levels = await levelRepository.find({
        order: { id: 'ASC' },
        take: index + 1,
      });
      const serviceWithLevels = await serviceRepository.save(service);
      console.log(
        'Updated levels for service',
        index + 1,
        JSON.stringify(serviceWithLevels, null, 2),
      );
    }
  }
  await connection.destroy();
}

seed();
