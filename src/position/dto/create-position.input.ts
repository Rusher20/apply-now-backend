import { InputType, Field } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class CreatePositionInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  isActive: boolean;

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];
}
