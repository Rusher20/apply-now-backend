import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateApplicationInput {
  @Field() name: string;
  @Field() gender: string;
  @Field() email: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field() position: string;
  @Field() city: string;
  @Field() province: string;
  @Field() region: string;
  @Field() expectedSalary: string;
  @Field() applicationLetter: string;
  @Field({ nullable: true })
  resumeUrl?: string;
}
