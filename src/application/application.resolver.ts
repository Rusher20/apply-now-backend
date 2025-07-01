import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { CreateApplicationInput } from './dto/create-application.input';
import { JobApplication } from './entities/job-application.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { plainToInstance } from 'class-transformer';

@Resolver(() => JobApplication)
export class ApplicationResolver {
  constructor(private readonly service: ApplicationService) {}

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

    const resumeUrl = `http://localhost:3000/uploads/resumes/${storedFilename}`;
    await this.service.create({ ...input, resumeUrl });

    return true;
  }

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }
}
