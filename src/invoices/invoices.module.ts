import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Location } from 'src/locations/entities/location.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Invoice } from './entities/invoice.entity';
import { Event } from 'src/event/entities/event.entity';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
