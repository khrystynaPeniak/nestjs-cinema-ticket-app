import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { PrismaService } from 'prisma/prisma.service';
import { SeatFactory } from 'src/halls/factories/seat.factory';
import { HallFactory } from './factories/hall.factory';

@Module({
  providers: [HallsService, PrismaService, SeatFactory, HallFactory],
  controllers: [HallsController],
})
export class HallsModule {}
