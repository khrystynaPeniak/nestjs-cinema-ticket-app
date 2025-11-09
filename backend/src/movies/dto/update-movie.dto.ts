import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieStatus } from '@prisma/client';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({ example: 'Inception' })
  title?: string;

  @ApiPropertyOptional({
    example: 'A sci-fi thriller about dreams within dreams',
  })
  description?: string;

  @ApiPropertyOptional({ example: 148 })
  duration?: number;

  @ApiPropertyOptional({ example: 'Sci-Fi' })
  genre?: string;

  @ApiPropertyOptional({ example: 'https://example.com/poster.jpg' })
  posterUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/trailer.mp4' })
  trailerUrl?: string;

  @ApiPropertyOptional({ example: 8.8 })
  rating?: number;

  @ApiPropertyOptional({
    enum: MovieStatus,
    example: MovieStatus.NOW_SHOWING,
    description: 'Movie status',
  })
  status?: MovieStatus;

  @ApiPropertyOptional({ example: '2010-07-16' })
  releaseDate?: string;
}
