import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';

@Injectable()
export class UserAlreadyExistsGuard implements CanActivate {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = context.switchToHttp().getRequest().body;
        // check if user with username already exists
        const foundUser = await this.userModel.findOne({ username: user.username });
        return !foundUser;
    }
}