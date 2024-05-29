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

type ErrorKeywordAndSchemaType<T extends keyof StrictJSONSchema> = {
  errorKeyword: T
  errorKeywordSchema: Exclude<StrictJSONSchema[T], undefined>
}

export type FormatedJSONSchemaError =
  & {
    errorLocation: AbsoluteJSONPointer
  }
  & (
    /** https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6 */
    // 这里排除了 array 下的几种情况，如 oneOf（它无法在前端被展示）
    // any
    | ErrorKeywordAndSchemaType<'type'>
    | ErrorKeywordAndSchemaType<'enum'>
    | ErrorKeywordAndSchemaType<'const'>
    // string
    | ErrorKeywordAndSchemaType<'format'>
    | ErrorKeywordAndSchemaType<'maxLength'>
    | ErrorKeywordAndSchemaType<'minLength'>
    | ErrorKeywordAndSchemaType<'pattern'>
    // number & integer
    | ErrorKeywordAndSchemaType<'multipleOf'>
    | ErrorKeywordAndSchemaType<'maximum'>
    | ErrorKeywordAndSchemaType<'exclusiveMaximum'>
    | ErrorKeywordAndSchemaType<'minimum'>
    | ErrorKeywordAndSchemaType<'exclusiveMinimum'>
    // array
    | ErrorKeywordAndSchemaType<'maxItems'>
    | ErrorKeywordAndSchemaType<'minItems'>
    | ErrorKeywordAndSchemaType<'uniqueItems'>
    // object
    | ErrorKeywordAndSchemaType<'maxProperties'>
    | ErrorKeywordAndSchemaType<'minProperties'>
    | ErrorKeywordAndSchemaType<'required'>
  )
