import type {
  AbsoluteJSONPointer,
  JSONValue,
  RelativeJSONPointer,
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
 * Pointing to a value from JSON data via absolute pointer
 */
export type $DataAbsolutePointer = { $data: AbsoluteJSONPointer }
/**
 * Pointing to a value from JSON data via relative pointer
 */
export type $DataRelativePointer = { $data: RelativeJSONPointer }

/**
 * Pointing to a value from JSON data, either absolute or relative
 */
export type $DataPointer = $DataAbsolutePointer | $DataRelativePointer

/**
 * Present a literal value
 */
export type $ValuePointer = { $value: JSONValue }

/**
 * Pointing to a context value
 */
export type $ContextPointer = { $context: AbsoluteJSONPointer }

/**
 * Pointing to the value of the column in the schema
 */
export type $SchemaPointer = { $schema: AbsoluteJSONPointer }
