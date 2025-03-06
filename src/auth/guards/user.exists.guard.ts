import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.schema';

@Injectable()
export class UserAlreadyExistsGuard implements CanActivate {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().body;
        // check if user with username already exists
        return (!! this.userModel.findOne({ username: user.username }))
    }
}