import { SeatType } from '@prisma/client';

export interface HallRowConfig {
  number: number;
  seats: number;
  type?: SeatType;
}

export interface HallConfiguration {
  rows: HallRowConfig[];
}
