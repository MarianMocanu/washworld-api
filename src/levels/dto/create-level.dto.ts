import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  constructor(name: string) {
    this.name = name;
  }

  @IsString()
  @IsNotEmpty()
  name: string;
}
