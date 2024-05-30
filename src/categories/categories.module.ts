import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  imports: [PrismaModule],
  exports: [CategoryService],
})
export class CategoriesModule {}
