import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from 'src/infrastructure/repositories/prisma';
import { SignInUserDto } from 'src/application/dto/user.dto';
import { User } from 'src/domain/entities';
import { ITokenService } from './interfaces/token.service.interface';

@Injectable()
export class UserAuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async signIn({ email, password }: SignInUserDto) {
    const userData = await this.userRepository.findUserByEmail(email);

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

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return await this.tokenService.createTokens(user.id);
  }

  async createAccessToken(id: number) {
    return await this.tokenService.createAccessToken(id);
  }
}
