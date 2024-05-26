import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupDTO: CreateUserDto): Promise<User> {
    const createdUser = this.userService.create(signupDTO);
    if (!createdUser) {
      throw new BadRequestException('Error creating user');
    }
    return createdUser;
  }

  async login({ email, password }: LoginDto): Promise<{ user: User; token: string }> {
    const foundUser = await this.userService.findOneByEmail(email);
    if (!foundUser || !foundUser.comparePassword(password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //   check for inactive account (instead of deleting account Admin should be able to deactivate it)
    if (!foundUser.isActive) {
      throw new UnauthorizedException('Inactive account');
    }
    const payload = {
      email: foundUser.email,
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
    };
    return {
      user: foundUser,
      token: jwt.sign(payload, process.env.JWT_SECRET),
    };
  }

  refreshToken(user: User): string {
    return jwt.sign(user, process.env.JWT_SECRET);
  }
}
