import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/updated-movies.dto';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';
import { UserRole } from 'src/users/enum/role.enum';

@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }

  @Get('catch-all')
  @UseGuards(AuthGuard())
  finMany(): Promise<Movie[]> {
    return this.service.findMany();
  }

  @Get('catch/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.service.findOne(id);
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeMovie(
    @AuthUser() user: User,
    @Param('id') movieId: string,
  ): Promise<User> {
    const userId = user.id;
    return this.service.likeMovie(userId, movieId);
  }

  @Put('update/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body('data') data: UpdateMovieDto,
  ): Promise<Movie> {
    return this.service.updateMovie(
      {
        where: { id: id },
      },
      data,
    );
  }
}
