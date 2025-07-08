import { ObjectType, Field, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class JobApplication {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  confidentialityAgreed: boolean;

  @Field()
  name: string;

  @Field()
  age: string;

  @Field()
  gender: string;

  @Field()
  email: string;

  @Field()
  contactNumber: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  province: string;

  @Field()
  education: string;

  @Field()
  applicationSource: string;

  @Field(() => String, { nullable: true })
  referralName: string | null;

  @Field()
  hasStableInternet: string;

  @Field(() => String, { nullable: true })
  internetProvider: string | null;

  @Field()
  position: string;

  @Field(() => GraphQLJSON, { nullable: true })
  roleSpecific: any;

  @Field(() => String, { nullable: true })
  resumeUrl: string | null;

  @Field()
  applicationLetter: string;

  @Field()
  status: string;
}
