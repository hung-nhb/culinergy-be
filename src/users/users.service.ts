import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

interface UserOptions {
  populate?: string[];
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // remove password from createUserDto
    delete createUserDto.password;

    const user = new this.userModel({
      ...createUserDto,
      hashedPassword,
    });

    return user.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateOneByEmail(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    
    return this.userModel.updateOne({ email }, {
      $set: updateUserDto,
    }, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string, options?: UserOptions) {
    if (options?.populate) {
      return this.userModel.findOne({ email }).populate(options.populate);
    }

    return this.userModel.findOne({ email });
  }
}
