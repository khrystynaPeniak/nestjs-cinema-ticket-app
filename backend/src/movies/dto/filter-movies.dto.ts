import { IsOptional, IsEnum, IsString } from 'class-validator';
import { MovieStatus } from '@prisma/client';

export class FilterMoviesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(MovieStatus)
  status?: MovieStatus;

  @IsOptional()
  @IsString()
  genre?: string;
}
