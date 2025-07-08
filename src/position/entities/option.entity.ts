import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Option {
  @Field(() => Int)
  id: number;

  @Field()
  value: string;

   @Field({ nullable: true })
  requiresInput?: boolean;

  @Field({ nullable: true })
  inputLabel?: string;
}
