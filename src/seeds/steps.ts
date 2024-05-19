import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Step } from 'src/steps/entities/step.entity';
import { CreateStepDto } from 'src/steps/dto/create-step.dto';
import { Service, ServiceType } from 'src/service/entities/service.entity';

dotenv.config();

const stepSeeds: CreateStepDto[] = [
  { name: 'Car Soap', order: 1, description: 'This is step 1', duration: 100 },
  { name: 'Drying', order: 2, description: 'This is step 2', duration: 110 },
  { name: 'Brush wash', order: 3, description: 'This is step 3', duration: 90 },
  { name: 'High pressure rinse', order: 4, description: 'This is step 4', duration: 80 },
  { name: 'Wheel wash', order: 5, description: 'This is step 5', duration: 50 },
  { name: 'Rinse wax', order: 6, description: 'This is step 6', duration: 20 },
  { name: 'Undercarriage wash', order: 7, description: 'This is step 7', duration: 600 },
  { name: 'Polishing', order: 8, description: 'This is step 8', duration: 120 },
  { name: 'Insect repellent', order: 9, description: 'This is step 9', duration: 50 },
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

    const stepRepository = connection.getRepository<Step>('Step');
    const serviceRepository = connection.getRepository<Service>('Service');

    for (const [index, stepSeed] of stepSeeds.entries()) {
      const step = await stepRepository.findOne({ where: { name: stepSeed.name } });
      if (!step) {
        const newStep = stepRepository.create(stepSeed);
        const savedStep = await stepRepository.save(newStep);
        console.log('Step', index + 1, JSON.stringify(savedStep, null, 2));
      }
    }

    const automatedServices: Service[] = await serviceRepository.find({
      where: { type: ServiceType.auto },
    });

    for (const [index, service] of automatedServices.entries()) {
      const numberOfSteps = Math.floor(Math.random() * 5) + 3;
      service.steps = await stepRepository.find({
        order: { id: 'ASC' },
        take: numberOfSteps,
      });
      const serviceWithSteps = await serviceRepository.save(service);
      console.log(
        'Updated steps for service',
        index + 1,
        JSON.stringify(serviceWithSteps, null, 2),
      );
    }
  }
  await connection.destroy();
}

seed();
