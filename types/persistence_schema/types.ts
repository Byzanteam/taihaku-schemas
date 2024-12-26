import type {
  AbsoluteJSONPointer,
  JSONPointer,
  JSONValue,
} from '../primitive.ts'

export type ColumnName = string
export type ColumnType =
  | 'uuid'
  | 'text'
  | 'numeric'
  | 'boolean'
  | 'timestamp'
  | 'jsonb'
  | 'date'
  | 'text[]'

export type AssociationName = string

/**
 * Pointing to a context value
 */
export type ContextPointer = {
  type: 'context'
  value: AbsoluteJSONPointer
}

/**
 * Pointing to a value from JSON data, either absolute or relative
 */
export type DataPointer = {
  type: 'data'
  value: JSONPointer
}

/**
 * Pointing to the value of the column in the schema
 */
export type SchemaPointer = {
  type: 'schema'
  value: JSONPointer
}

/**
 * Present a literal value
 */
export type ValuePointer<T = JSONValue> = {
  type: 'value'
  value: T
}
