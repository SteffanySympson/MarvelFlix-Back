import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jwtContants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {}
