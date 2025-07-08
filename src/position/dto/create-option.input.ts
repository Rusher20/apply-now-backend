import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field()
  value: string;

  @Field({ nullable: true })
  requiresInput?: boolean;

  @Field({ nullable: true })
  inputLabel?: string;
}
