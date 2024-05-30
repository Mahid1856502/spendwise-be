// src/transaction/dto/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNumber, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @ApiProperty()
  senderId: number;

  @IsInt()
  @ApiProperty()
  receiverId: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  amount: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  categoryId?: number;
}
