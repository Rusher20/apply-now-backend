// src/position/enums/question-type.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  textarea = 'textarea',
  number = 'number',
  radio = 'radio',
  checkbox = 'checkbox',
  dropdown = 'dropdown',
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
});
