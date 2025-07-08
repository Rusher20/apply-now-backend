// src/position/enums/question-type.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  text = 'text',
  textarea = 'textarea',
  number = 'number',
  select = 'select',
  radio = 'radio',
  checkbox = 'checkbox',
  dropdown = 'dropdown',
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
});
