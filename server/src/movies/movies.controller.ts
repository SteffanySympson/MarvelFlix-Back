import { Controller, Body, Post, Get, Param, Delete } from '@nestjs/common';
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

  @Get('catch-all')
  finMany(): Promise<Movie[]> {
    return this.service.findMany();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.service.findOne(id);
  }

  @Delete('delete/:id')
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
