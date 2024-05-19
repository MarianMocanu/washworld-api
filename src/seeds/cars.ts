import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const carSeeds = [
  { plateNumber: 'AB12345', userId: 1, subscriptionId: 1 },
  { plateNumber: 'CD67890', userId: 1, subscriptionId: 2 },
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
    console.log('Seeding cars');
    const carRepository = connection.getRepository('Car');
    const userRepository = connection.getRepository('User');
    const subscriptionRepository = connection.getRepository('Subscription');

    for (const carSeed of carSeeds) {
      const user = await userRepository.findOne({ where: { id: carSeed.userId } });
      const subscription = await subscriptionRepository.findOne({
        where: { id: carSeed.subscriptionId },
      });

      if (!user || !subscription) {
        console.log('User or subscription not found, skipping car', carSeed);
        continue;
      }

      const car = await carRepository.findOne({ where: { plateNumber: carSeed.plateNumber } });
      if (!car) {
        const newCar = carRepository.create({
          plateNumber: carSeed.plateNumber,
          user: user,
          subscription: subscription,
          updatedAt: new Date(),
        });
        const savedCar = await carRepository.save(newCar);
        console.log('Car seeded', savedCar);
      } else {
        console.log('Car ALREADY seeded');
      }
    }
  }
  await connection.destroy();
}

seed();
