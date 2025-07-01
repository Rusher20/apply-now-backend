import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ApplicationService, ApplicationResolver,PrismaService]
})
export class ApplicationModule {}
