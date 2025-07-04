import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationInput } from './dto/create-application.input';
import { JobApplication } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateApplicationInput) {
    return this.prisma.jobApplication.create({
      data: input,
    });
  }

   async findAll(): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    })
  }

  async delete(id: number): Promise<JobApplication> {
  return this.prisma.jobApplication.delete({
    where: { id },
  });
}

async updateStatus(id: number, status: string): Promise<JobApplication> {
  return this.prisma.jobApplication.update({
    where: { id },
    data: { status },
  });
}
}
