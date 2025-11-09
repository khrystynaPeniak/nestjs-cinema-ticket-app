import { IsString, IsInt, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { HallConfigurationDto } from './hall-configuration.dto';

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
    maximum: 200,
  })
  @IsInt()
  @Min(1)
  @Max(200)
  totalSeats: number;

  @ApiProperty({
    type: HallConfigurationDto,
    description: 'Seating configuration for the hall',
    example: {
      rows: [
        { number: 1, seats: 10, type: 'STANDARD' },
        { number: 2, seats: 12, type: 'VIP' },
        { number: 3, seats: 10, type: 'STANDARD' },
      ],
    },
  })
  @ValidateNested()
  @Type(() => HallConfigurationDto)
  configuration: HallConfigurationDto;
}
