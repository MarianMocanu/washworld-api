import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Location } from 'src/location/entities/location.entity';
import { TerminalStatus } from '../entities/terminal.entity';
import { Event } from 'src/event/entities/event.entity';
export class CreateTerminalDto {
  constructor(status: TerminalStatus, location: Location, events: Event[]) {
    this.status = status;
    this.location = location;
    this.events = events;
  }

  @IsNotEmpty()
  @IsEnum(TerminalStatus)
  status: TerminalStatus;

  @IsNotEmpty()
  @IsEnum(Location)
  location: Location;

  @IsOptional()
  @IsArray()
  @IsEnum(Event, { each: true })
  events: Event[];
}
