import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
  imports: [PrismaModule],
})
export class TransactionsModule {}
