import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { SeatFactory } from './factories/seat.factory';
import { HallFactory } from './factories/hall.factory';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HallsController],
  providers: [HallsService, SeatFactory, HallFactory],
  exports: [HallsService],
})
export class HallsModule {}
