import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: "Set the JWT SECRET here!",
      // set the expiration time of jwt token at 30 minutes
      signOptions: { expiresIn: '30m'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
