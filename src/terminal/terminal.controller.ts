import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('terminals')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTerminalDto: CreateTerminalDto) {
    return this.terminalService.create(createTerminalDto);
  }

  @UseGuards(AuthGuard)
  @Get('available')
  findTerminalByServiceId(
    @Query('serviceId', ParseIntPipe) serviceId: number,
    @Query('locationId', ParseIntPipe) locationId: number,
  ) {
    if (serviceId && locationId) {
      return this.terminalService.findAvailableAtLocationByServiceId(locationId, serviceId);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.terminalService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('location/:locationId')
  findAllByLocationId(@Param('locationId', ParseIntPipe) locationId: number) {
    return this.terminalService.findAllByLocationId(locationId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTerminalDto: UpdateTerminalDto) {
    return this.terminalService.update(id, updateTerminalDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.remove(id);
  }
}
