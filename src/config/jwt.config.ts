import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().jwt_secret,
      signOptions: { expiresIn: '20m' },
    };
  },
};