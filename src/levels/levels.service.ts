import { Injectable } from '@nestjs/common';
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
    return await this.levelRepository.find();
  }

  // async findOne(id: number): Promise<Level> {
  //   return await this.levelRepository.findOne(id);
  // }

  // async update(id: number, updateLevelDto: UpdateLevelDto): Promise<Level> {
  //   await this.levelRepository.update(id, updateLevelDto);
  //   return await this.levelRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.levelRepository.delete(id);
  }
}
