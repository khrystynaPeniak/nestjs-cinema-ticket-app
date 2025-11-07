import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
