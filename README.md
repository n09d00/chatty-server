# Base Authentication API implemented in NestJS with MongoDB

## Description

This API provides basic functionality for User Authentication with JWT.
It uses MongoDB as the database for storing user data.

It is possible to build on top of this API for your own use cases.


## Get Started

To use this API some parameters have to be provided:
- Database Connectivity in src/app.module.ts:
  ```
  @Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), # add your database connection here
    AuthModule],
  controllers: [],
  providers: [],
  })
  export class AppModule {}
  ```

- Inserting JWT Secret (using enviorenment variables) in src/auth/auth.module.ts:
  ```
  @Module({
  imports: [
    JwtModule.register({
      secret: "Set the JWT SECRET here!", # Insert here
      // set the expiration time of jwt token at 30 minutes
      signOptions: { expiresIn: '30m'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController, LocalStrategy, JwtStrategy],
  })
  ```
  
  and in src/auth/strategies/jwt.strategy.ts:
  ```
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'Set SECRET KEY HERE!',
      });
    }
  
    validate(payload: any) {
      return payload;
    }
  }
  ```

