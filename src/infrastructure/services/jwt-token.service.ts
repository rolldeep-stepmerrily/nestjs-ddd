import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenService } from 'src/domain/services/users/interfaces';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('NODE_ENV') private readonly nodeEnv: string,
    @Inject('JWT_SECRET_KEY') private readonly jwtSecretKey: string,
  ) {}

  async createTokens(userId: number) {
    const expiresIn = this.nodeEnv === 'production' ? '30m' : '1d';

    return {
      accessToken: this.jwtService.sign({ sub: 'access', id: userId }, { secret: this.jwtSecretKey, expiresIn }),
      refreshToken: this.jwtService.sign({ sub: 'refresh', id: userId }, { secret: this.jwtSecretKey }),
    };
  }

  async createAccessToken(userId: number): Promise<{ accessToken: string }> {
    const expiresIn = this.nodeEnv === 'production' ? '30m' : '1d';

    return {
      accessToken: this.jwtService.sign({ sub: 'access', id: userId }, { secret: this.jwtSecretKey, expiresIn }),
    };
  }
}
