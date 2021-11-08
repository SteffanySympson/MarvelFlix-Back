import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from './enum/role.enum';
import * as bcrypt from 'bcrypt';

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

    const salt = 10;
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await this.db.user.create({
      data: {
        ...data,
        role: role,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Id não encontrado em nosso DB, esse usuário pode não existir!',
      );
    }
    delete user.password;
    return user;
  }

  async findMany() {
    const user = await this.db.user.findMany();
    const newUser = user.map(({ password, ...resto }) => resto);
    return newUser;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.user.delete({
      where: { id },
    });

    return {
      message: 'Id encontrado e deletado com sucesso!',
    };
  }
}
