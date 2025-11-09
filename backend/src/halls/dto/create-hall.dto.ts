import {
  IsString,
  IsInt,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import type { HallConfiguration } from '../types/seat.types';

export class CreateHallDto {
  @ApiProperty({
    example: 'Main Hall',
    description: 'Name of the cinema hall',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 120,
    description: 'Total number of seats in the hall',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  totalSeats: number;

  @ApiProperty({
    description: 'Seat configuration for the hall',
    example: {
      rows: [
        {
          rowNumber: 1,
          seats: [
            { number: 1, type: 'STANDARD' },
            { number: 2, type: 'VIP' },
          ],
        },
        {
          rowNumber: 2,
          seats: [
            { number: 1, type: 'STANDARD' },
            { number: 2, type: 'STANDARD' },
          ],
        },
      ],
    },
  })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Object)
  configuration: HallConfiguration;
}
