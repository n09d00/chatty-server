import { Controller, Get, Delete, UseGuards, Req, Post, Param } from "@nestjs/common";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from "express";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    @Delete('/delete-account')
    async deleteAccount(@Req() req: Request) {
        const {username, id} = req.user as UserPayload;
        console.log(id);
        const userS = await this.usersService.getUserWithUsername(username);
        const u = await this.userModel.findById({_id: id}).exec();
        console.log(u);
        //this.usersService.deleteUser(user.username)
    }

    @Get('/get-all')
    async getAllUsers(@Req() req: Request): Promise<User[]> {
        const user = req.user as User;
        return this.usersService.getAllUsers(user.username);
    }

    @Post('/add-friend/:username')
    async addFriendToCurrentUser(@Req() req: Request, @Param('username') friendUsername: string) {
        const currentUser = req.user as User
        this.usersService.addFriend(currentUser.username, friendUsername);
    }
}