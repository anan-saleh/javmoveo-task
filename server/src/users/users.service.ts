import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findByUsername(username: string) {
    const trimmedUserName = username.trim().toLowerCase();
    return this.userModel.findOne({ username: trimmedUserName }).exec();
  }
}
