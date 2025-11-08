import { IsInt, IsNotEmpty, IsOptional, IsEnum, Min } from 'class-validator';
import { SeatType } from '@prisma/client';

export class CreateSeatDto {
  @IsNotEmpty()
  hallId: string;

  @IsInt()
  @Min(1)
  rowNumber: number;

  @IsInt()
  @Min(1)
  seatNumber: number;

  @IsOptional()
  @IsEnum(SeatType)
  type?: SeatType;
}
