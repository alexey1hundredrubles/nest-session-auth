import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(login: string) {
    return await this.userModel.findOne({ login });
  }
  async create(login: string, password: string) {
    return await this.userModel.create({ login, password });
  }
}
