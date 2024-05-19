import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Event } from 'src/event/entities/event.entity';
import { LocationsService } from 'src/locations/locations.service';
@Module({
  imports: [TypeOrmModule.forFeature([Terminal, Location, Event])],
  controllers: [TerminalController],
  providers: [TerminalService, LocationsService],
})
export class TerminalModule {}
