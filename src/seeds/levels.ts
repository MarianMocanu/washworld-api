import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { CreateLevelDto } from 'src/levels/dto/create-level.dto';
import { Level } from 'src/levels/entities/level.entity';
import { Service, ServiceType } from 'src/service/entities/service.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Location } from 'src/locations/entities/location.entity';

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
    entities: [Level, Subscription, Service, Car, User, Event, Terminal, Location, Invoice, Step],
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

    const servicesLength = automatedServices.length;

    for (const [index, service] of automatedServices.entries()) {
      service.levels = await levelRepository.find({
        order: { id: 'DESC' },
        take: servicesLength - index,
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
