import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
// import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
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

  findOne(id: number): Promise<Terminal> {
    return this.terminalRepository.findOne({
      where: { id },
      relations: ['services'],
    });
  }

  findAllByServiceId(serviceId: number): Promise<Terminal[]> {
    return this.terminalRepository.find({
      where: { services: { id: serviceId } },
      relations: ['services'],
    });
  }

  findAllByLocationId(locationId: number): Promise<Terminal[]> {
    return this.terminalRepository.find({
      where: { location: { id: locationId } },
      relations: ['location'],
    });
  }

  async update(id: number, updateTerminalDto: UpdateTerminalDto) {
    const foundTerminal = this.terminalRepository.findOneBy({ id });
    if (!foundTerminal) {
      throw new NotFoundException('Terminal not found');
    }

    const terminalToSave = this.terminalRepository.create({
      ...foundTerminal,
      ...updateTerminalDto,
    });
    return await this.terminalRepository.save(terminalToSave);
  }

  remove(id: number): Promise<DeleteResult> {
    const foundTerminal = this.terminalRepository.findOneBy({ id });
    if (!foundTerminal) {
      throw new NotFoundException('Terminal not found');
    }
    return this.terminalRepository.delete(id);
  }
}
