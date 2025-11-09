import { IsInt, IsEnum, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SeatType } from '@prisma/client';

export class HallRowConfigDto {
  @ApiProperty({
    example: 1,
    description: 'Row number',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  number: number;

  @ApiProperty({
    example: 10,
    description: 'Number of seats in this row',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  seats: number;

  @ApiPropertyOptional({
    example: 'STANDARD',
    description: 'Type of seats in this row',
    enum: SeatType,
    default: 'STANDARD',
  })
  @IsEnum(SeatType)
  @IsOptional()
  type?: SeatType;
}
