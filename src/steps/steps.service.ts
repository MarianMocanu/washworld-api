import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UpdateStepDto } from './dto/update-step.dto';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(createStepDto: CreateStepDto): Promise<Step> {
    const newStep = this.stepRepository.create(createStepDto);
    return await this.stepRepository.save(newStep);
  }

  async findAll(): Promise<Step[]> {
    return await this.stepRepository.find({ order: { order: 'ASC' } });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} step`;
  // }

  // update(id: number, updateStepDto: UpdateStepDto) {
  //   return `This action updates a #${id} step`;
  // }

  async remove(id: number): Promise<void> {
    await this.stepRepository.delete(id);
  }
}
