import { Controller, Get, Delete, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from "express";
import { User } from "./user.schema";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Delete('/delete-account')
    @UseGuards(JwtAuthGuard)
    deleteAccount(@Req() req: Request) {
        const user = req.user as User;
        this.usersService.deleteUser(user.username)
    }
}