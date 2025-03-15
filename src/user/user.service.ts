import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserWithUsername(username: string ): Promise<any> {
        const foundUser = await this.userModel.findOne({ username }).exec();

        if (!foundUser) {
            throw new NotFoundException(`User with Username: ${ username } not found!`);
        }
        return foundUser
    }

    async createNewUser(userdto: UserDto): Promise<User> {
        const newUser =  new this.userModel(userdto);
        return newUser.save();
    }

    async deleteUser(username: string) {
        this.userModel.deleteOne({ username });
    }

    async addFriend(username: string, friendUsername: string) {
        const updatedUser = await this.userModel.findOneAndUpdate(
            { username }, 
            { $push: { friendsList: friendUsername }},
            { new: true }
        );
        return updatedUser
    }

    async getAllUsers(currentLoggedInUsername: string): Promise<User[]> {
        const users = await this.userModel.find({ username: { $ne: currentLoggedInUsername }}).select("-password");
        return users;
    }

}