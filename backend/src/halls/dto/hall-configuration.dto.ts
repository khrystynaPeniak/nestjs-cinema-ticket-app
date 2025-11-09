import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { HallRowConfigDto } from './hall-row-config.dto';

export class HallConfigurationDto {
  @ApiProperty({
    type: [HallRowConfigDto],
    description: 'Array of row configurations',
    example: [
      { number: 1, seats: 10, type: 'STANDARD' },
      { number: 2, seats: 12, type: 'VIP' },
      { number: 3, seats: 10, type: 'STANDARD' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => HallRowConfigDto)
  rows: HallRowConfigDto[];
}
