import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePositionInput } from './dto/create-position.input';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.position.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async create(data: CreatePositionInput) {
    return this.prisma.position.create({
      data: {
        title: data.title,
        description: data.description,
        isActive: data.isActive,
        value: data.title.toLowerCase().replace(/\s+/g, '-'),
        questions: {
          create: data.questions.map((q) => ({
            type: q.type,
            label: q.label,
            placeholder: q.placeholder,
            required: q.required,
            options: {
              create: q.options?.map((opt) => ({
                value: opt.value,
                requiresInput: opt.requiresInput ?? false,
                inputLabel: opt.inputLabel ?? null,
              })) || [],
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    await this.prisma.position.delete({ where: { id } });
  }

  async update(id: number, data: CreatePositionInput) {
    const existingQuestions = await this.prisma.question.findMany({
      where: { positionId: id },
      select: { id: true },
    });

    const questionIds = existingQuestions.map((q) => q.id);

    await this.prisma.option.deleteMany({
      where: { questionId: { in: questionIds } },
    });

    await this.prisma.question.deleteMany({
      where: { positionId: id },
    });

    return this.prisma.position.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        isActive: data.isActive,
        value: data.title.toLowerCase().replace(/\s+/g, '-'),
        updatedAt: new Date(),
        questions: {
          create: data.questions.map((q) => ({
            type: q.type,
            label: q.label,
            placeholder: q.placeholder,
            required: q.required,
            options: {
              create: q.options?.map((opt) => ({
                value: opt.value,
                requiresInput: opt.requiresInput ?? false,
                inputLabel: opt.inputLabel ?? null,
              })) || [],
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }
}
