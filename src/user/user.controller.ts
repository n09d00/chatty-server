import { Controller, Get, Delete, UseGuards } from "@nestjs/common";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
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