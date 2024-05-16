import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
@Injectable()
export class TerminalService {
  constructor(@InjectRepository(Terminal) private terminalRepository: Repository<Terminal>) {}

  async create(createTerminalDto: CreateTerminalDto) {
    const newTerminal = this.terminalRepository.create(createTerminalDto);
    return this.terminalRepository.save(newTerminal);
  }

  findAll(): Promise<Terminal[]> {
    return this.terminalRepository.find();
  }

  findOne(id: number): Promise<Terminal> {
    return this.terminalRepository.findOneBy({ id });
  }

  findOneByLocationId(locationId: number): Promise<Terminal[]> {
    return this.terminalRepository.find({ where: { location: { id: locationId } } });
  }

  async update(id: number, updateTerminalDto: Partial<UpdateTerminalDto>): Promise<Terminal> {
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
