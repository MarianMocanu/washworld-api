import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalDto } from './create-terminal.dto';
import { TerminalStatus } from '../entities/terminal.entity';

export class UpdateTerminalDto extends PartialType(CreateTerminalDto) {
  constructor(status: TerminalStatus, locationId: number) {
    super();
    this.status = status;
    this.locationId = locationId;
  }
}
