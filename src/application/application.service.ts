import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationInput } from './dto/create-application.input';
import { JobApplication, Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateApplicationInput): Promise<JobApplication> {
    return this.prisma.jobApplication.create({
      data: {
        ...input,
        roleSpecific: input.roleSpecific,
      },
    });
  }

   async findAll() {
    return this.prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(where: Prisma.JobApplicationWhereUniqueInput): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({ where });
  }

 async updateStatus(id: number, status: string): Promise<JobApplication> {
  return this.prisma.jobApplication.update({
    where: { id },
    data: { status },
  });
}

}
