import type { AbsoluteJSONPointer, StrictJSONSchema } from '../primitive.ts'

export interface JSONSchemaError {
  absoluteKeywordLocation: AbsoluteJSONPointer
  instanceLocation: AbsoluteJSONPointer
}

export interface ValidationError {
  absoluteValidationLocation: AbsoluteJSONPointer
  instanceLocation: AbsoluteJSONPointer
  dependencies: Array<AbsoluteJSONPointer>
  errorMessage: string
}

export interface InternalError {
  location?: AbsoluteJSONPointer
  message: string
}

export interface FormatedValidationError {
  errorLocation: AbsoluteJSONPointer
  errorMessage: string
  dependencies: Array<AbsoluteJSONPointer>
}

export type FormatedJSONSchemaError<T extends keyof StrictJSONSchema> = {
  errorLocation: AbsoluteJSONPointer
  errorKeyword: T
  /** 同 ajv 的 ObjectError["params"] */
  errorParams: Record<string, unknown>
}
