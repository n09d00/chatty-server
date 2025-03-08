import { HttpCode, Controller, Post, Req, UseGuards, Body, HttpStatus, Res, Delete, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/user.dto';
import { UserAlreadyExistsGuard } from './guards/userexists.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('/delete-account')
    @UseGuards(JwtAuthGuard)
    deleteAccount(@Req() req: Request) {
        console.log("Inside controller.");
        /*const { accessToken } = req.body;
        this.authService.deleteUserAccount(accessToken);*/
    }

    @Get('/status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        console.log('Inside AuthController status method');
        console.log(req.user);
        return req.user;
    }
}
