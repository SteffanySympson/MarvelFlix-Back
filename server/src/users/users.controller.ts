import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UnprocessableEntityException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { SimpleGuard } from 'src/auth/simple.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller()
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create-user')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  @Post('create-admin')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @UseGuards(AuthGuard())
  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Get('find-many')
  findMany() {
    return this.service.findMany();
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
