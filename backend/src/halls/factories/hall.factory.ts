import { CreateHallDto } from '../dto/create-hall.dto';
import { HallConfiguration } from '../types/seat.types';

export class HallFactory {
  createHall(dto: CreateHallDto) {
    if (dto.totalSeats > 200) {
      throw new Error('Maximum seats per hall is 200');
    }

    const config: HallConfiguration = dto.configuration;

    return {
      name: dto.name,
      totalSeats: dto.totalSeats,
      configuration: config,
    };
  }
}
