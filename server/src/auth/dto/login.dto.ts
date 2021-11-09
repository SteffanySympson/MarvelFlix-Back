import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { User } from '@prisma/client';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
