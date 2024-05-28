import type { AbsoluteJSONPointer } from '../primitive.ts'

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

export interface FormatedJSONSchemaError {
  errorLocation: AbsoluteJSONPointer
  /** https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6 */
  errorKeyword: string
  keywordSchema: string | Array<string> | null
  dependencies: Array<AbsoluteJSONPointer>
}
