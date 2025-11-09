import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { SeatFactory } from './factories/seat.factory';
import { HallFactory } from './factories/hall.factory';
import type { Prisma } from '@prisma/client';

@Injectable()
export class HallsService {
  constructor(
    private prisma: PrismaService,
    private seatFactory: SeatFactory,
    private hallFactory: HallFactory,
  ) {}

  async create(dto: CreateHallDto) {
    const existing = await this.prisma.hall.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Hall with this name already exists');
    }

    const hallData = this.hallFactory.createHall(dto);

    const prismaData: Prisma.HallCreateInput = {
      name: hallData.name,
      totalSeats: hallData.totalSeats,
      configuration: hallData.configuration as unknown as Prisma.InputJsonValue,
    };

    return this.prisma.$transaction(async (tx) => {
      const hall = await tx.hall.create({ data: prismaData });

      const seats = this.seatFactory.createSeatsWithContinuousNumbers(
        hall.id,
        hallData.configuration,
      );

      if (seats.length > 0) {
        await tx.seat.createMany({ data: seats });
      }

      return tx.hall.findUnique({
        where: { id: hall.id },
        include: {
          seats: { orderBy: [{ rowNumber: 'asc' }, { seatNumber: 'asc' }] },
        },
      });
    });
  }

  async findAll() {
    return this.prisma.hall.findMany({
      include: {
        _count: { select: { seats: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const hall = await this.prisma.hall.findUnique({
      where: { id },
      include: {
        seats: {
          orderBy: [{ rowNumber: 'asc' }, { seatNumber: 'asc' }],
        },
      },
    });

    if (!hall) {
      throw new NotFoundException(`Hall with ID "${id}" not found`);
    }

    return hall;
  }

  async update(id: string, dto: UpdateHallDto) {
    await this.findOne(id);

    if (dto.configuration && dto.totalSeats) {
      const calculatedSeats = dto.configuration.rows.reduce(
        (sum, row) => sum + row.seats,
        0,
      );

      if (calculatedSeats !== dto.totalSeats) {
        throw new BadRequestException(
          `Total seats mismatch: configuration has ${calculatedSeats} seats but totalSeats is ${dto.totalSeats}`,
        );
      }
    }

    const updateData: Prisma.HallUpdateInput = {
      name: dto.name,
      totalSeats: dto.totalSeats,
      configuration: dto.configuration
        ? (dto.configuration as unknown as Prisma.InputJsonValue)
        : undefined,
    };

    return this.prisma.hall.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.hall.delete({ where: { id } });
  }
}
