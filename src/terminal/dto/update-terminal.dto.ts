import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalDto } from './create-terminal.dto';
import { Location } from 'src/location/entities/location.entity';
import { TerminalStatus } from '../entities/terminal.entity';
import { Event } from 'src/event/entities/event.entity';
export class UpdateTerminalDto extends PartialType(CreateTerminalDto) {
  constructor(status: TerminalStatus, location: Location, events: Event[]) {
    super();
    this.status = status;
    this.location = location;
    this.events = events;
  }
}
