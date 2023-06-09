import { Repository } from 'typeorm';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { Token } from '../entities/entities';
import { appDataSource } from '../config/app-data-source';

class TokenService {
  private readonly tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = appDataSource.getRepository(Token);
  }

  generateToken(payload: JwtPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY as string, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY as string, {
      expiresIn: '30d'
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY as string);

      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY as string);

      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token: Token = await this.tokenRepository.create({ userId, refreshToken });

    return token;
  }

  // async removeToken(refreshToken: string) {
  //   const tokenData = await tokenModel.deleteOne({ refreshToken });

  //   return tokenData;
  // }

  // async findToken(refreshToken: string) {
  //   const tokenData = await tokenModel.findOne({ refreshToken });

  //   return tokenData;
  // }
}

export const tokenService = new TokenService();
