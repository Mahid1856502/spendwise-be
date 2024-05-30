import { Module } from '@nestjs/common';
import { PayeeService } from './payee.service';
import { PayeeController } from './payee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PayeeController],
  providers: [PayeeService],
  imports: [PrismaModule],
})
export class PayeeModule {}
