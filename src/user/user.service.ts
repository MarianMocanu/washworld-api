import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ email });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    // changed from .update to .save to trigger BeforeUpdate hook (normalization in user.entity.ts)
    const userToSave = this.userRepository.create({ ...foundUser, ...updateUserDto });
    return await this.userRepository.save(userToSave);
  }

  async remove(id: number): Promise<DeleteResult> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.delete(id);
  }
}
