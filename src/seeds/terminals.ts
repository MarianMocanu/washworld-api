import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Terminal, TerminalStatus } from '../../src/terminal/entities/terminal.entity';
import { Location } from '../../src/locations/entities/location.entity';
import { Service } from 'src/service/entities/service.entity';

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

  const connection = await AppDataSource.initialize();

  if (connection.isInitialized) {
    console.log('Seeding terminals');
    const locationRepository = connection.getRepository<Location>('Location');
    const serviceRepository = connection.getRepository<Service>('Service');
    const terminalRepository = connection.getRepository<Terminal>('Terminal');

    const locations: Location[] = await locationRepository.find();
    const services: Service[] = await serviceRepository.find({ order: { id: 'ASC' } });

    for (const location of locations) {
      const terminalPromises = Array.from({ length: 5 }).map(async (_, index) => {
        const newTerminal = terminalRepository.create({ status: TerminalStatus.idle });
        newTerminal.location = location;
        newTerminal.services = services;

        const savedTerminal = await terminalRepository.save(newTerminal);
        console.log(
          'saved terminal',
          savedTerminal.id,
          'at location',
          location.id,
          'with services',
          services.map(service => service.id).join(', '),
        );
        return savedTerminal;
      });

      await Promise.all(terminalPromises);
    }
  }
  await connection.destroy();
}

seed();
