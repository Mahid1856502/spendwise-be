// src/transaction/transaction.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { senderId, receiverId, amount, categoryId } = createTransactionDto;

    // Check if sender exists
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });
    if (!sender) {
      throw new Error(`Sender with ID ${senderId} not found`);
    }

    // Check if receiver exists
    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
    });
    if (!receiver) {
      throw new Error(`Receiver with ID ${receiverId} not found`);
    }

    // Check if sender has sufficient balance
    if (sender.balance < amount) {
      throw new Error(`Sender with ID ${senderId} has insufficient balance`);
    }

    // Optionally check if category exists
    if (categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }
    }

    // Perform the transaction and update balances within a transaction
    return this.prisma.$transaction(async (prisma) => {
      // Update sender's balance
      await prisma.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount } },
      });

      // Update receiver's balance
      await prisma.user.update({
        where: { id: receiverId },
        data: { balance: { increment: amount } },
      });

      // Create the transaction
      return prisma.transaction.create({
        data: {
          senderId,
          receiverId,
          amount,
          categoryId,
        },
      });
    });
  }
}
