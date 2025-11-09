import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieStatus } from '@prisma/client';

export class FilterMoviesDto {
  @ApiPropertyOptional({
    description: 'Search movies by title or description',
    example: 'Inception',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by movie status',
    enum: MovieStatus,
    example: MovieStatus.NOW_SHOWING,
  })
  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @ApiPropertyOptional({
    description: 'Filter by genre',
    example: 'Action',
  })
  @IsOptional()
  @IsString()
  genre?: string;
}
