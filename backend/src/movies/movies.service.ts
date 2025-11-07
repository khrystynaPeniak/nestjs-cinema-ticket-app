import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieDto): Promise<Movie> {
    return await this.prisma.movie.create({
      data: {
        ...dto,
        releaseDate: new Date(dto.releaseDate),
      },
    });
  }

  async findAll(filters: FilterMoviesDto): Promise<Movie[]> {
    const where: Record<string, any> = {};

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.genre) {
      where.genre = { contains: filters.genre, mode: 'insensitive' };
    }

    return await this.prisma.movie.findMany({
      where,
      orderBy: { releaseDate: 'desc' },
    });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    await this.findOne(id);

    return await this.prisma.movie.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.releaseDate && { releaseDate: new Date(dto.releaseDate) }),
      },
    });
  }

  async remove(id: string): Promise<Movie> {
    await this.findOne(id);

    return await this.prisma.movie.delete({
      where: { id },
    });
  }
}
