import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  async getUserProfile(@Request() req) {
    const user = await this.usersService.findOneByEmail(req.user.sub, { populate: ['allergies'] });
    const { hashedPassword, ...result } = user.toJSON();
    return result;
  }

  @Put('/profile')
  async updateUserProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneByEmail(req.user.sub, updateUserDto);
  }
}
