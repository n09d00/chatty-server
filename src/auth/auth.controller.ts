import { Controller, Post, Req, UseGuards, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/user.dto';
import { UserAlreadyExistsGuard } from './guards/user.exists.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @UseGuards(UserAlreadyExistsGuard)
    register(@Body() userDto: UserDto, @Res() res: Response) {
        const user = this.authService.signUpNewUser(userDto.email, userDto.username, userDto.pass);
        return res.status(HttpStatus.CREATED).json({
            message: "Registration was successful.",
            user
        })
    }

    @Post('/login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }
}
