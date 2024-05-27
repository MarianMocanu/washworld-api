import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dto/create-level.dto';
// import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const newLevel = this.levelRepository.create(createLevelDto);
    return await this.levelRepository.save(newLevel);
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository
      .createQueryBuilder('level')
      .leftJoinAndSelect(
        'level.services',
        'service',
        'service.price = (select MAX(service.price) FROM level INNER JOIN services_levels ON level.id = services_levels."levelId" INNER JOIN service ON services_levels."serviceId" = service.id WHERE services_levels."levelId" = level.id)',
      )
      .addOrderBy('level.price', 'ASC')
      .leftJoinAndSelect('service.steps', 'step')
      .addOrderBy('step.order', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Level> {
    const level = await this.levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    return level;
  }

  // async update(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
  //   await this.levelRepository.update(id, updateLevelDto);
  //   return await this.levelRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.levelRepository.delete(id);
  }
}
