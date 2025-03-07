import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      // set the expiration time of jwt token at 30 minutes
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
