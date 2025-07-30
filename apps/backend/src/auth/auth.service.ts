import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { SignInInput } from './dto/signin.input';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-JwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    if (!user.password)
      throw new UnauthorizedException('User password not set');

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async generateJwtToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async signIn(user: User) {
    const { accessToken } = await this.generateJwtToken(user.id);
    console.log(
      `User ${user.email} signed in successfully and token is ${accessToken}`,
    );

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const currentUser = { id: user.id };

    return currentUser;
  }
}
