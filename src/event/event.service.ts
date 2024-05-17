import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(newEvent);
  }

  findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    const foundEvent = await this.eventRepository.findOneBy({ id });
    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }
    return foundEvent;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const foundEvent = await this.eventRepository.findOneBy({ id });
    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }
    const updatedEvent = this.eventRepository.create({ ...foundEvent, ...updateEventDto });
    return this.eventRepository.save(updatedEvent);
  }

  async remove(id: number) {
    const foundEvent = await this.eventRepository.findOneBy({ id });
    if (!foundEvent) {
      throw new NotFoundException('Event not found');
    }
    return this.eventRepository.remove(foundEvent);
  }
}
