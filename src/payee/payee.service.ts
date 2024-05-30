import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayeeDto } from './dto/create-payee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayeeService {
  constructor(private prisma: PrismaService) {}

  async createPayee(createPayeeDto: CreatePayeeDto) {
    const { userId, payeeId } = createPayeeDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const payeeUser = await this.prisma.user.findUnique({
      where: { id: payeeId },
    });

    if (!user || !payeeUser) {
      throw new Error('User or PayeeUser not found');
    }

    const existingPayee = await this.prisma.payee.findFirst({
      where: {
        userId: userId,
        payeeId: payeeId,
      },
    });

    if (existingPayee) {
      throw new ConflictException('Payee already exists for this user');
    }

    return this.prisma.payee.create({
      data: {
        userId,
        payeeId,
      },
    });
  }

  async findAll() {
    const payees = await this.prisma.payee.findMany({
      include: {
        payeeUser: true, // Include the user details of the payee
      },
    });

    return payees.map((payee) => payee.payeeUser); // Map to return only user details
  }

  async findByUserId(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const payees = await this.prisma.payee.findMany({
      where: { userId },
      include: {
        payeeUser: true, // Include the user details of the payee
      },
    });

    return payees.map((payee) => payee.payeeUser); // Map to return only user details
  }

  async removeByUserId(userId: number, payeeId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const payee = await this.prisma.payee.findFirst({
      where: {
        userId: userId,
        payeeId: payeeId,
      },
    });

    if (!payee) {
      throw new NotFoundException(
        `Payee with ID ${payeeId} for user ID ${userId} not found`,
      );
    }

    return this.prisma.payee.delete({
      where: { id: payee.id },
    });
  }
}
