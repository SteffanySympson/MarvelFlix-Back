import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from './enum/role.enum';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.UserCreateInput, role: UserRole): Promise<User> {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException(
        'Esse e-mail já consta em nosso Banco de Dados!',
      );
    }

    const user = await this.db.user.create({
      data,
    });

    return user;
  }
}
