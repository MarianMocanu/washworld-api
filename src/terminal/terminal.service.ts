import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
// import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Terminal, TerminalStatus } from './entities/terminal.entity';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { LocationsService } from 'src/locations/locations.service';
@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal) private readonly terminalRepository: Repository<Terminal>,
    private readonly locationService: LocationsService,
  ) {}

  async create(createTerminalDto: CreateTerminalDto): Promise<Terminal> {
    const location = await this.locationService.findOne(createTerminalDto.locationId);
    const newTerminal = this.terminalRepository.create({
      ...createTerminalDto,
      location: location,
    });
    return await this.terminalRepository.save(newTerminal);
  }

  findAll(): Promise<Terminal[]> {
    return this.terminalRepository.find({
      relations: ['services'],
    });
  }

  findOne(id: number, withoutRelations?: boolean): Promise<Terminal> {
    return this.terminalRepository.findOne({
      where: { id },
      relations: withoutRelations ? [] : ['services'],
    });
  }

  findAvailableAtLocationByServiceId(locationId: number, serviceId: number): Promise<Terminal> {
    const foundTerminal = this.terminalRepository.findOne({
      where: {
        services: { id: serviceId },
        location: { id: locationId },
        status: TerminalStatus.idle,
      },
      relations: ['services', 'location'],
    });
    return foundTerminal;
  }

  findAllByLocationId(locationId: number): Promise<Terminal[]> {
    return this.terminalRepository
      .createQueryBuilder('terminal')
      .leftJoinAndSelect('terminal.services', 'service')
      .leftJoinAndSelect('service.steps', 'step')
      .leftJoinAndSelect(
        'service.levels',
        'level',
        'level.id = (SELECT MIN(id) FROM level INNER JOIN services_levels ON level.id = services_levels."levelId" WHERE services_levels."serviceId" = service.id)',
      )
      .where('terminal.locationId = :locationId', { locationId })
      .getMany();
  }

  async update(id: number, updateTerminalDto: UpdateTerminalDto) {
    const foundTerminal = await this.terminalRepository.findOneBy({ id });
    if (!foundTerminal) {
      throw new NotFoundException('Terminal not found');
    }
    const updatedTerminal = this.terminalRepository.merge(foundTerminal, updateTerminalDto);
    return await this.terminalRepository.save(updatedTerminal);
  }

  remove(id: number): Promise<DeleteResult> {
    const foundTerminal = this.terminalRepository.findOneBy({ id });
    if (!foundTerminal) {
      throw new NotFoundException('Terminal not found');
    }
    return this.terminalRepository.delete(id);
  }
}
