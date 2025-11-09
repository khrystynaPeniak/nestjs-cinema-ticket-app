import { Injectable } from '@nestjs/common';
import { SeatType, Prisma } from '@prisma/client';
import { HallConfiguration } from '../types/seat.types';

@Injectable()
export class SeatFactory {
  createSeatsWithContinuousNumbers(
    hallId: string,
    configuration: HallConfiguration,
  ): Prisma.SeatCreateManyInput[] {
    const seats: Prisma.SeatCreateManyInput[] = [];
    let seatCounter = 1;

    for (const row of configuration.rows) {
      for (let i = 0; i < row.seats; i++) {
        seats.push({
          hallId,
          rowNumber: row.number,
          seatNumber: seatCounter,
          type: row.type || SeatType.STANDARD,
          createdAt: new Date(),
        });
        seatCounter++;
      }
    }

    return seats;
  }
}
