import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TerminalStatus } from '../entities/terminal.entity';

export class CreateTerminalDto {
  constructor(partial: Partial<CreateTerminalDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsEnum(TerminalStatus)
  status: TerminalStatus;

  @IsNotEmpty()
  @IsNumber()
  locationId: number;
}
