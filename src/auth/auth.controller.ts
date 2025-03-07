import { HttpCode, Controller, Post, Req, UseGuards, Body, HttpStatus, Res, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/user.dto';
import { UserAlreadyExistsGuard } from './guards/userexists.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @UseGuards(UserAlreadyExistsGuard)
    register(@Body() userDto: UserDto, @Res() res: Response) {
        const user = this.authService.signUpNewUser(userDto.email, userDto.username, userDto.password);
        return res.status(HttpStatus.CREATED).json({
            message: "Registration was successful.",
            user
        })
    }

    @Post('/login')
    @HttpCode(200)
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    @Delete('/delete-account')
    @UseGuards(JwtAuthGuard)
    deleteAccount(@Req() req: Request) {
        const { accessToken } = req.body;
        this.authService.deleteUserAccount(accessToken);
    }
}
