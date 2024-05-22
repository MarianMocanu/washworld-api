import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
// import { UpdateTerminalDto } from './dto/update-terminal.dto';

@Controller('terminals')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post()
  create(@Body() createTerminalDto: CreateTerminalDto) {
    return this.terminalService.create(createTerminalDto);
  }

  @Get()
  findAll() {
    return this.terminalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.findOne(id);
  }

  @Get('/location/:locationId')
  findAllByLocationId(@Param('id', ParseIntPipe) locationId: number) {
    return this.terminalService.findAllByLocationId(locationId);
  }

  @Get('/available/service/:serviceId')
  findTerminalByServiceId(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return this.terminalService.findAvailableByServiceId(serviceId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTerminalDto: UpdateTerminalDto) {
  //   this.validateTerminalId(id);
  //   return this.terminalService.update(+id, updateTerminalDto);
  // }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.remove(id);
  }
}
