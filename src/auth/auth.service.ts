import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schema/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: LoginDto): Promise<UserDocument> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    
    const isMatchPassword = await bcrypt.compare(password, user.hashedPassword);
    if (isMatchPassword) {
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async signJwt(user: Pick<UserDocument, 'email'>) {
    const payload = { sub: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async registerUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email already exists', 400);
      }
      throw error;
    }
    
  }
}
