import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HallsService } from './halls.service';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Halls')
@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new hall (admin only)' })
  @ApiBody({ type: CreateHallDto })
  @ApiResponse({ status: 201, description: 'Hall created successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admin can create halls',
  })
  create(@Body() createHallDto: CreateHallDto) {
    return this.hallsService.create(createHallDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all halls (public)' })
  @ApiResponse({ status: 200, description: 'List of all halls' })
  findAll() {
    return this.hallsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hall by ID (public)' })
  @ApiParam({ name: 'id', description: 'Hall ID' })
  @ApiResponse({ status: 200, description: 'Hall details' })
  @ApiResponse({ status: 404, description: 'Hall not found' })
  findOne(@Param('id') id: string) {
    return this.hallsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update hall by ID (admin only)' })
  @ApiBody({ type: UpdateHallDto })
  @ApiResponse({ status: 200, description: 'Hall updated successfully' })
  @ApiResponse({ status: 404, description: 'Hall not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admin can update halls',
  })
  update(@Param('id') id: string, @Body() updateHallDto: UpdateHallDto) {
    return this.hallsService.update(id, updateHallDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete hall by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'Hall deleted successfully' })
  @ApiResponse({ status: 404, description: 'Hall not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admin can delete halls',
  })
  remove(@Param('id') id: string) {
    return this.hallsService.remove(id);
  }
}
