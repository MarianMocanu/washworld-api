import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TerminalStatus } from '../entities/terminal.entity';

export class CreateTerminalDto {
  constructor(status: TerminalStatus, locationId: number) {
    this.status = status;
    this.locationId = locationId;
  }

  @IsNotEmpty()
  @IsEnum(TerminalStatus)
  status: TerminalStatus;

  @IsNotEmpty()
  @IsNumber()
  locationId: number;
}
