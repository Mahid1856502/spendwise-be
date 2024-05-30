import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreatePayeeDto {
  @IsInt()
  @ApiProperty()
  userId: number;

  @IsInt()
  @ApiProperty()
  payeeId: number;
}
