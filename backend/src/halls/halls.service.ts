import { Injectable } from '@nestjs/common';
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
      throw new Error('Hall with this name already exists');
    }

    const hallData = this.hallFactory.createHall(dto);

    const prismaData: Prisma.HallCreateInput = {
      name: hallData.name,
      totalSeats: hallData.totalSeats,
      configuration: JSON.parse(
        JSON.stringify(hallData.configuration),
      ) as Prisma.InputJsonValue,
    };

    return this.prisma.$transaction(async (tx) => {
      const hall = await tx.hall.create({ data: prismaData });

      const seats = this.seatFactory.createSeats(hall.id, dto.configuration);
      await tx.seat.createMany({ data: seats });

      return hall;
    });
  }

  async findAll() {
    return this.prisma.hall.findMany({
      include: {
        _count: { select: { seats: true } },
      },
    });
  }

  async findOne(id: string) {
    const hall = await this.prisma.hall.findUnique({
      where: { id },
      include: {
        seats: { orderBy: [{ rowNumber: 'asc' }, { seatNumber: 'asc' }] },
      },
    });

    if (!hall) {
      throw new Error('Hall not found');
    }

    return hall;
  }

  async update(id: string, dto: UpdateHallDto) {
    const existing = await this.findOne(id);

    if (!existing) {
      throw new Error('Cannot update non-existing hall');
    }

    const updateData: Prisma.HallUpdateInput = {
      ...dto,
      configuration: dto.configuration
        ? (JSON.parse(
            JSON.stringify(dto.configuration),
          ) as Prisma.InputJsonValue)
        : undefined,
    };

    return this.prisma.hall.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    if (!existing) {
      throw new Error('Cannot delete non-existing hall');
    }

    return this.prisma.hall.delete({ where: { id } });
  }
}
