import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface IJWTPayload {
  email: string;
  username: string;
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configeService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configeService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJWTPayload) {
    return {
      email: payload.email,
      userId: payload.id,
      username: payload.username,
    };
  }
}
