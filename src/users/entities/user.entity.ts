import { ApiProperty } from '@nestjs/swagger';
import { Payee, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true })
  name: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  payees: Payee[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UpdateUserEntity implements User {
  @ApiProperty()
  @Exclude()
  id: number;

  @ApiProperty()
  @Exclude()
  name: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  @Exclude()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  @Exclude()
  payees: Payee[];

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;
}
