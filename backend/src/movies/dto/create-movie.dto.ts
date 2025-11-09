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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Inception',
    description: 'The title of the movie',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'A thief who steals corporate secrets through dream-sharing technology.',
    description: 'Short description of the movie',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 148,
    description: 'Duration of the movie in minutes',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: 'Science Fiction',
    description: 'Genre of the movie',
  })
  @IsString()
  genre: string;

  @ApiPropertyOptional({
    example: 'https://image.tmdb.org/t/p/original/inception.jpg',
    description: 'Poster URL of the movie',
  })
  @IsOptional()
  @IsString()
  posterUrl?: string;

  @ApiPropertyOptional({
    example: 'https://youtube.com/watch?v=YoHD9XEInc0',
    description: 'Trailer URL of the movie',
  })
  @IsOptional()
  @IsString()
  trailerUrl?: string;

  @ApiPropertyOptional({
    example: 8.8,
    description: 'Rating between 0 and 10',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @ApiPropertyOptional({
    example: MovieStatus.NOW_SHOWING,
    description: 'Current status of the movie',
    enum: MovieStatus,
  })
  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @ApiProperty({
    example: '2024-07-16',
    description: 'Release date of the movie in ISO format',
  })
  @IsDateString()
  releaseDate: string;
}
