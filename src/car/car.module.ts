import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from 'src/car/entities/car.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Location,
      Step,
      Subscription,
      Invoice,
      Event,
      User,
      Service,
      Level,
      Terminal,
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, UserService],
  exports: [CarService],
})
export class CarModule {}
