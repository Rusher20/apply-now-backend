import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationInput } from './dto/create-application.input';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateApplicationInput) {
    return this.prisma.jobApplication.create({
      data: input,
    });
  }
}
