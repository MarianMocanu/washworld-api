import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CarService } from 'src/car/car.service';
import { ServiceService } from 'src/service/service.service';
import { TerminalService } from 'src/terminal/terminal.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    private readonly carService: CarService,
    private readonly serviceService: ServiceService,
    private readonly terminalService: TerminalService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create();
    const car = await this.carService.findOne(createEventDto.carId, true);
    const service = await this.serviceService.findOne(createEventDto.serviceId, true);
    const terminal = await this.terminalService.findOne(createEventDto.terminalId, true);

    if (!car || !service || !terminal) {
      throw new NotFoundException('Car/Service/Terminal not found');
    }

    newEvent.car = car;
    newEvent.service = service;
    newEvent.terminal = terminal;

    return this.eventRepository.save(newEvent);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findAllByUserId(userId: number, limit: number) {
    const options: FindManyOptions<Event> = {
      where: { car: { user: { id: userId } } },
      relations: ['car', 'service', 'terminal', 'terminal.location'],
      order: { id: 'DESC' },
    };
    if (limit) {
      options.take = limit;
    }
    return this.eventRepository.find(options);
  }

  findNumberOfEventsByUserId(userId: number) {
    const options: FindManyOptions<Event> = {
      where: { car: { user: { id: userId } } },
    };
    return this.eventRepository.count(options);
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
