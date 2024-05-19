import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Event } from 'src/event/entities/event.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location,
      Step,
      Subscription,
      Invoice,
      Event,
      Car,
      User,
      Service,
      Level,
      Terminal,
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationModule {}
