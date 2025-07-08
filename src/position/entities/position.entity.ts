import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from './question.entity';

@ObjectType()
export class Position {
  @Field(() => Int)
  id: number;

  @Field()
  value: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  isActive: boolean;

  @Field(() => [Question])
  questions: Question[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
