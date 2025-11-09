import { SeatType, Prisma } from '@prisma/client';
import { HallConfiguration } from '../types/seat.types';

export class SeatFactory {
  createSeats(
    hallId: string,
    configuration: HallConfiguration,
  ): Prisma.SeatCreateManyInput[] {
    const seats: Prisma.SeatCreateManyInput[] = [];

    for (const row of configuration.rows) {
      for (let i = 1; i <= row.seats; i++) {
        seats.push({
          hallId,
          rowNumber: row.number,
          seatNumber: i,
          type: row.type || SeatType.STANDARD,
          createdAt: new Date(),
        });
      }
    }

    return seats;
  }
}
