import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { Location } from 'src/locations/entities/location.entity';
import { ServiceService } from 'src/service/service.service';
import { CarService } from 'src/car/car.service';
import { TerminalService } from 'src/terminal/terminal.service';
import { UserModule } from 'src/user/user.module';
import { LocationModule } from 'src/locations/locations.module';

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
    UserModule,
    LocationModule,
  ],
  controllers: [EventController],
  providers: [EventService, ServiceService, CarService, TerminalService],
})
export class EventModule {}
