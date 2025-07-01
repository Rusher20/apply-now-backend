import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class JobApplication {
  @Field(() => Int) id: number;
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
  @Field() resumeUrl: string ;
  @Field() createdAt: Date;
}
