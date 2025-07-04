import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApplicationModule } from './application/application.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      csrfPrevention: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ApplicationModule,
    AuthModule,
    UserModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
