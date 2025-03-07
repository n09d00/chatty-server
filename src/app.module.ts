import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './user/user.schema';
import { User } from './user/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(`MONGO_DB_URI`)
      })
    }), 
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
