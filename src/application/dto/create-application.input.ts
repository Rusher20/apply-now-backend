import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateApplicationInput {
  @Field() name: string;
  @Field() age: string;
  @Field() gender: string;
  @Field() email: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field() city: string;
  @Field() province: string;
  @Field() education: string;

  @Field() confidentialityAgreed: boolean;

  @Field() applicationSource: string;
  @Field({ nullable: true }) referralName?: string;
  @Field() hasStableInternet: string;
  @Field({ nullable: true }) internetProvider?: string;

  @Field() position: string;

  @Field(() => GraphQLJSONObject) roleSpecific: any;

  @Field({ nullable: true }) resumeUrl?: string;
  @Field() applicationLetter: string;
}