import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  year: Date;

  @IsString()
  length: Date;

  @IsNotEmpty()
  storyline: string;

  @IsUrl()
  image: string;
}
