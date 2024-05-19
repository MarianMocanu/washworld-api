import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Car } from 'src/car/entities/car.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Level } from 'src/levels/entities/level.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Terminal } from 'src/terminal/entities/terminal.entity';
import { Event } from 'src/event/entities/event.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Service } from 'src/service/entities/service.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Car,
      Subscription,
      Level,
      Invoice,
      Terminal,
      Event,
      Step,
      Service,
      Location,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
