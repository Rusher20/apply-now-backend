import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { CreateApplicationInput } from './dto/create-application.input';
import { JobApplication } from './entities/job-application.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Resolver(() => JobApplication)
export class ApplicationResolver {
  constructor(private readonly service: ApplicationService,
    private readonly configService: ConfigService
  ) {}

  @Mutation(() => Boolean)
  async submitApplication(
    @Args('input') input: CreateApplicationInput,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<boolean> {
    const { createReadStream, filename } = await file;

    const uploadDir = join(process.cwd(), 'uploads', 'resumes');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const storedFilename = `${Date.now()}-${filename}`;
    const path = join(uploadDir, storedFilename);
    const stream = createReadStream();
    const out = createWriteStream(path);
    stream.pipe(out);

    await new Promise<void>((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });

   const baseUrl = this.configService.get<string>('BASE_URL');
    const resumeUrl = baseUrl
      ? `${baseUrl}/uploads/resumes/${storedFilename}`
      : `/uploads/resumes/${storedFilename}`;

    await this.service.create({ ...input, resumeUrl });

    return true;
  }

 @Query(() => [JobApplication])
  async jobApplications(): Promise<JobApplication[]> {
    return this.service.findAll();
  }

   @Mutation(() => JobApplication)
  async deleteApplication(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<JobApplication> {
    return this.service.delete({ id });
  }

 @Mutation(() => JobApplication)
async updateApplicationStatus(
  @Args('id', { type: () => Int }) id: number,
  @Args('status') status: string,
): Promise<JobApplication> {
  return this.service.updateStatus(id, status);
}

}
