import { ValidationInputSchema } from "@/libs/validation";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type FormSchema = {
  [key: string]: InputSchema
}

export type InputSchema = FormInputSchema | TextAreaInputSchema

type BaseInputSchema = {
  readonly label: string,
  readonly className?: string,
} & ValidationInputSchema

type FormInputSchema = {
  readonly type: 'text' | 'email',
  readonly attributes: InputHTMLAttributes<HTMLInputElement>
} & BaseInputSchema;

type TextAreaInputSchema = {
  readonly type: 'textarea',
  readonly attributes: TextareaHTMLAttributes<HTMLTextAreaElement>
} & BaseInputSchema;

