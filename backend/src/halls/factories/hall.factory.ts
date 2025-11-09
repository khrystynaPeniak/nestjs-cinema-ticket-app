import { Injectable } from '@nestjs/common';
import { CreateHallDto } from '../dto/create-hall.dto';
import { HallConfiguration } from '../types/seat.types';

@Injectable()
export class HallFactory {
  createHall(dto: CreateHallDto) {
    if (dto.totalSeats > 200) {
      throw new Error('Maximum seats per hall is 200');
    }

    const calculatedSeats = dto.configuration.rows.reduce(
      (sum, row) => sum + row.seats,
      0,
    );

    if (calculatedSeats !== dto.totalSeats) {
      throw new Error(
        `Total seats mismatch: configuration has ${calculatedSeats} seats but totalSeats is ${dto.totalSeats}`,
      );
    }

    const config: HallConfiguration = {
      rows: dto.configuration.rows.map((row) => ({
        number: row.number,
        seats: row.seats,
        type: row.type,
      })),
    };

    return {
      name: dto.name,
      totalSeats: dto.totalSeats,
      configuration: config,
    };
  }
}
