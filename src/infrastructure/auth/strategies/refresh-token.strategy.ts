import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/domain/entities';
import { UserRepository } from 'src/infrastructure/repositories/prisma';

interface IValidate {
  sub: string;
  id: number;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('JWT_SECRET_KEY') private readonly jwtSecretKey: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecretKey,
    });
  }

  async validate({ sub, id }: IValidate) {
    if (sub !== 'refresh') {
      throw new UnauthorizedException();
    }

    const userData = await this.userRepository.findUserById(id);

    if (!userData) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const user = new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
      userData.deletedAt,
    );

    if (!user.isActive()) {
      throw new UnauthorizedException('비활성화된 사용자입니다.');
    }

    return user;
  }
}
