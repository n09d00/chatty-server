import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/user.dto';



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

    async signUpNewUser(email: string, username: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        const newUser: UserDto = { email: email, username: username, password: hashedPassword };

        return this.userService.createNewUser(newUser);
    }

    async validateUser(username: string, password: string): Promise<{ accessToken: string }> {
        const foundUsers = await this.userService.getUserWithUsername(username);

        // compare the passwords
        const passwordMatches = await bcrypt.compare(password, foundUsers.password);

        if (!passwordMatches) {
           console.log(false);
           throw new UnauthorizedException();
        }

        // choose the attribute as payload
        const payload = { username: foundUsers.username }
        return {
            // sign the payload and return the jwt token
            accessToken: await this.jwtService.signAsync(payload)
        }
    }

    async deleteUserAccount(accessToken: string) {
        const username = this.jwtService.decode(accessToken).username;
        console.log(username)
        return
    }
}
