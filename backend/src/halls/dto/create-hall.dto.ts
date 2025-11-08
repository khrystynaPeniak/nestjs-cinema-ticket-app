import { IsString, IsInt, IsObject, Min } from 'class-validator';

export class CreateHallDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  totalSeats: number;

  @IsObject()
  configuration: any;
}
