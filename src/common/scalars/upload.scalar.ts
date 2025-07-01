import { Scalar } from '@nestjs/graphql';
import GraphQLUpload  from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar {
  description = 'Upload custom scalar type';
  parseValue = GraphQLUpload.parseValue;
  serialize = GraphQLUpload.serialize;
  parseLiteral = GraphQLUpload.parseLiteral;
}
