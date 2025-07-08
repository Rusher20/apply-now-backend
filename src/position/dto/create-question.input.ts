import { InputType, Field } from '@nestjs/graphql';
import { QuestionType } from '../enums/question-type.enum';
import { CreateOptionInput } from './create-option.input';

@InputType()
export class CreateQuestionInput {
  @Field(() => QuestionType)
  type: QuestionType;

  @Field()
  label: string;

  @Field({ nullable: true })
  placeholder?: string;

  @Field()
  required: boolean;

  @Field(() => [CreateOptionInput], { nullable: true })
  options?: CreateOptionInput[];
}
