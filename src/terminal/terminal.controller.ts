import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
// import { UpdateTerminalDto } from './dto/update-terminal.dto';

@Controller('terminal')
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
  findOne(@Param('id') id: string) {
    this.validateTerminalId(id);
    return this.terminalService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTerminalDto: UpdateTerminalDto) {
  //   this.validateTerminalId(id);
  //   return this.terminalService.update(+id, updateTerminalDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateTerminalId(id);
    return this.terminalService.remove(+id);
  }

  validateTerminalId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('User id is not a number');
    }
  }
}
