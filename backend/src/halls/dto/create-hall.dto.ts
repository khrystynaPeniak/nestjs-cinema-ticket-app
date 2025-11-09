import {
  IsString,
  IsInt,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { HallConfiguration } from '../types/seat.types';

export class CreateHallDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  totalSeats: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Object)
  configuration: HallConfiguration;
}
