import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Terminal, TerminalStatus } from '../../src/terminal/entities/terminal.entity';
import { Location } from '../../src/locations/entities/location.entity';
import { Event } from 'src/event/entities/event.entity';
import { Car } from 'src/car/entities/car.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Service } from 'src/service/entities/service.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
dotenv.config();

async function seed() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Location, Terminal, Event, Car, Subscription, User, Level, Service, Step, Invoice],
  });

  let locations;

  await AppDataSource.initialize().then(async () => {
    locations = await AppDataSource.manager.find(Location);

    if (!locations.length) {
      console.log('No locations found');
    } else if (locations.length > 0) {
      console.log('Locations found:', locations.length, ' Seeding terminals');
      const saveTerminals = locations.map((location: Location) => {
        const terminal = AppDataSource.manager.create(Terminal, {
          status: TerminalStatus.idle,
          location: location,
        });
        const terminal2 = AppDataSource.manager.create(Terminal, {
          status: TerminalStatus.maintenance,
          location: location,
        });
        const terminal3 = AppDataSource.manager.create(Terminal, {
          status: TerminalStatus.busy,
          location: location,
        });
        const terminal4 = AppDataSource.manager.create(Terminal, {
          status: TerminalStatus.closed,
          location: location,
        });

        return Promise.all([
          AppDataSource.manager.save(terminal),
          AppDataSource.manager.save(terminal2),
          AppDataSource.manager.save(terminal3),
          AppDataSource.manager.save(terminal4),
        ]);
      });
      Promise.all(saveTerminals)
        .then(async () => {
          console.log('All terminals saved');
          await AppDataSource.destroy();
        })
        .catch(error => {
          console.error('Error saving terminals', error);
          AppDataSource.destroy();
        });
    }
  });
}

seed();
