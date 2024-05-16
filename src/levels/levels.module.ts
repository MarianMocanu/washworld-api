import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Event } from 'src/event/entities/event.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Level,
      Subscription,
      Invoice,
      Event,
      Car,
      User,
      Service,
      Step,
      Terminal,
      Location,
    ]),
  ],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
