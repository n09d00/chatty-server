import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.schema';
import { access } from 'fs';



@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    private async hashPassword(password: string) {
        // set the number of round of hash function
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        return await bcrypt.hash(password, salt);
    }

    async signUpNewUser(email: string, username: string, password: string): Promise<User> {
        const hashedPassword = await this.hashPassword(password);
        const newUser: UserDto = { email: email, username: username, password: hashedPassword };

        return this.userService.createNewUser(newUser);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const foundUsers = await this.userService.getUserWithUsername(username);

        // compare the passwords
        const passwordMatches = await bcrypt.compare(password, foundUsers.password);

        if (!passwordMatches) {
           console.log(false);
           throw new UnauthorizedException();
        }

        // choose the attribute as payload
        const payload = { username: foundUsers.username, id: foundUsers._id };
        // sign the payload and return the jwt token
        const token = this.jwtService.sign(payload);
        return {
            accessToken: token
        };
    }
}
