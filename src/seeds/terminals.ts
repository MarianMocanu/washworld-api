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
    const terminalRepository = connection.getRepository<Terminal>('Terminal');
    const serviceRepository = connection.getRepository<Service>('Service');

    const locations: Location[] = await locationRepository.find();

    if (!locations.length) {
      console.log('No locations found');
    } else if (locations.length > 0) {
      for (const location of locations) {
        const numberOfTerminals = Math.floor(Math.random() * 5) + 1;

        const terminalPromises = Array.from({ length: numberOfTerminals }).map(async (_, index) => {
          const numberOfServices = Math.floor(Math.random() * 6) + 1;
          const services = await serviceRepository.find({
            order: { id: 'ASC' },
            take: numberOfServices,
          });
          const terminal = terminalRepository.create({
            status: TerminalStatus.idle,
            location: location,
            services: services,
          });
          console.log('Terminal', index + 1, 'for location', location.id);
          console.log(JSON.stringify(terminal, null, 2));
          return terminalRepository.save(terminal);
        });

        await Promise.all(terminalPromises);
      }
    }
  }
  await connection.destroy();
}

seed();
