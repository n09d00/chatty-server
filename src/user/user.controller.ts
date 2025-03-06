import { Controller, Get, Post, HttpCode, Body, Param } from "@nestjs/common";
import { UsersService } from "./user.service";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUser() {
        return this.usersService.getAllUser();
    }

    @Get()
    async getUserByUsername(username: string) {
        return this.usersService.getUserWithUsername(username);
    }
}