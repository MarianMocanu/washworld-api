import { Module } from '@nestjs/common';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Event } from 'src/event/entities/event.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { Location } from 'src/location/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Step,
      Subscription,
      Invoice,
      Event,
      Car,
      User,
      Service,
      Level,
      Terminal,
      Location,
    ]),
  ],
  controllers: [StepsController],
  providers: [StepsService],
})
export class StepsModule {}
