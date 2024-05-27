import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { AuthGuard } from 'src/auth/auth.guard';
// import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.levelsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateLevelId(id);
    return this.levelsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
  //   return this.levelsService.update(+id, updateLevelDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(+id);
  }

  validateLevelId(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException('Level id is not a number');
    }
  }
}
