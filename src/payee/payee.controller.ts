import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PayeeService } from './payee.service';
import { CreatePayeeDto } from './dto/create-payee.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PayeeEntity } from './entities/payee.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('payee')
@ApiTags('Payee')
export class PayeeController {
  constructor(private readonly payeeService: PayeeService) {}

  @Post('Payee')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: PayeeEntity })
  async createPayee(@Body() createPayeeDto: CreatePayeeDto) {
    return this.payeeService.createPayee(createPayeeDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return this.payeeService.findAll();
  }

  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: PayeeEntity, isArray: true })
  async findByUserId(@Param('userId') userId: number) {
    return this.payeeService.findByUserId(+userId);
  }

  @Delete(':userId/:payeeId')
  async removeByUserId(
    @Param('userId') userId: string,
    @Param('payeeId') payeeId: string,
  ) {
    try {
      return await this.payeeService.removeByUserId(+userId, +payeeId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
