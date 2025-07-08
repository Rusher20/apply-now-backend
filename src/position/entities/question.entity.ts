import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionType } from '../enums/question-type.enum';
import { Option } from './option.entity';

@ObjectType()
export class Question {
  @Field(() => Int)
  id: number;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field()
  label: string;

  @Field({ nullable: true })
  placeholder?: string;

  @Field()
  required: boolean;

  @Field(() => [Option])
  options: Option[];
}
