import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(@InjectRepository(Service) private readonly serviceRepository: Repository<Service>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(newService);
  }

  findAll() {
    return this.serviceRepository.find({
      relations: ['terminals', 'steps', 'levels'],
    });
  }

  // findOne(id: number, withoutRelations?: boolean) {
  //   return this.serviceRepository.findOne({
  //     where: { id },
  //     relations: withoutRelations ? [] : ['terminals', 'steps', 'levels'],
  //   });
  // }

  findOne(id: number, withoutRelations?: boolean) {
    if (withoutRelations) {
      return this.serviceRepository.findOne({ where: { id } });
    } else {
      return this.serviceRepository
        .createQueryBuilder('service')
        .leftJoinAndSelect('service.terminals', 'terminal')
        .leftJoinAndSelect('service.levels', 'level')
        .leftJoinAndSelect('service.steps', 'step')
        .where('service.id = :id', { id })
        .orderBy('step.id', 'ASC')
        .getOne();
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const foundService = this.serviceRepository.findOne({ where: { id } });
    if (!foundService) {
      throw new NotFoundException('Service not found');
    }

    const serviceToSave = this.serviceRepository.create({
      ...foundService,
      ...updateServiceDto,
    });
    return await this.serviceRepository.save(serviceToSave);
  }

  remove(id: number) {
    const foundService = this.serviceRepository.findOne({ where: { id } });
    if (!foundService) {
      throw new NotFoundException('Service not found');
    }
    return this.serviceRepository.delete({ id });
  }
}
