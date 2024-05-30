import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { AuthGuard } from 'src/auth/auth.guard';
// import { UpdateStepDto } from './dto/update-step.dto';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepsService.create(createStepDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.stepsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.stepsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
  //   return this.stepsService.update(+id, updateStepDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id);
  }
}
