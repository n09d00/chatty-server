import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/user.dto';



@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    private async hashPassword(password: string) {
        // set the number of round of hash function
        const rounds = 10;
        return await bcrypt.hash(password, rounds);
    }

    async signUpNewUser(email: string, username: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        const newUser: UserDto = { email: email, username: username, pass: hashedPassword };

        return this.userService.createNewUser(newUser);
    }

    async validateUser(username: string, pass: string): Promise<{ accessToken: string }> {
        const foundUsers = await this.userService.getUserWithUsername(username);

        // hash the password
        const hashedPassword = await this.hashPassword(foundUsers.password);

        // compare the passwords
        const passwordMatches = await bcrypt.compare(hashedPassword, foundUsers.password);

        if (!passwordMatches) {
           throw new UnauthorizedException();
        }

        // choose the attribute as payload
        const payload = { email: foundUsers.email }
        return {
            // sign the payload and return the jwt token
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
