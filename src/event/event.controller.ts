import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateEventId(id);
    return this.eventService.findOne(+id);
  }

  @Get('user/:userId')
  findAllByUserId(
    @Param('userId') userId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    return this.eventService.findAllByUserId(+userId, limit);
  }

  @Get('user/:userId/count')
  findNumberOfEventsByUserId(@Param('userId') userId: string) {
    return this.eventService.findNumberOfEventsByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    this.validateEventId(id);
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateEventId(id);
    return this.eventService.remove(+id);
  }

  validateEventId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Event id is not a number');
    }
  }
}
