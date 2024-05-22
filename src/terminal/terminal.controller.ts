import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
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

  @Get('available')
  findTerminalByServiceId(
    @Query('serviceId', ParseIntPipe) serviceId: number,
    @Query('locationId', ParseIntPipe) locationId: number,
  ) {
    if (serviceId && locationId) {
      return this.terminalService.findAvailableAtLocationByServiceId(locationId, serviceId);
    }
  }

  @Get()
  findAll() {
    return this.terminalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.findOne(id);
  }

  @Get('location/:locationId')
  findAllByLocationId(@Param('locationId', ParseIntPipe) locationId: number) {
    return this.terminalService.findAllByLocationId(locationId);
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
