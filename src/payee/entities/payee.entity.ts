import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PayeeEntity {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  payeeId: Number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  userId: Number;
}
