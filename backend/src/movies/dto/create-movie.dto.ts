import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { MovieStatus } from '@prisma/client';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;

  @IsOptional()
  @IsString()
  trailerUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @IsDateString()
  releaseDate: string;
}
