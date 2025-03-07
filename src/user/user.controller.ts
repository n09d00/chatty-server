import { Controller, Get, Post, HttpCode, Body, Param, Delete } from "@nestjs/common";
import { UsersService } from "./user.service";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/get-all')
    async getAllUser() {
        return this.usersService.getAllUser();
    }

    /*@Get("/:username")
    async getUserByUsername(username: string) {
        return this.usersService.getUserWithUsername(username);
    }*/
    @Delete('/delete-user/:username')
    async deleteUserByUsername(username: string) {
        this.usersService.deleteUser(username);
    }
}