import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateHallDto } from './create-hall.dto';
import type { HallConfiguration } from '../types/seat.types';

export class UpdateHallDto extends PartialType(CreateHallDto) {
  @ApiPropertyOptional({
    example: 'Hall 2',
    description: 'Name of the cinema hall',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 120,
    description: 'Total number of seats in the hall',
  })
  totalSeats?: number;

  @ApiPropertyOptional({
    example: {
      rows: [
        { number: 1, seats: 10, type: 'STANDARD' },
        { number: 2, seats: 12, type: 'VIP' },
      ],
    },
    description: 'Seating configuration of the hall',
  })
  configuration?: HallConfiguration;
}
