import { Controller, Body, Post, Get } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  @Post('create')
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }

  @Get('find-many')
  findMany(): Promise<Movie[]> {
    return this.service.findMany();
  }
}
