import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class ChangeUserRoleDto {
  @ApiProperty({ enum: UserRole, description: 'New role for the user' })
  @IsEnum(UserRole)
  role: UserRole;
}
