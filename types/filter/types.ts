import type {
  DataPointer,
  SchemaPointer,
  ValuePointer,
} from '../persistence_schema/mod.ts'
import type { JSONValue } from '../primitive.ts'

export type Operand<T = JSONValue> =
  | ValuePointer<T>
  | SchemaPointer
  | DataPointer

export enum ConditionalFilterOperator {
  AND = 'and',
  OR = 'or',
}

export enum LogicalFilterOperator {
  CO = 'co',
  EQ = 'eq',
  LT = 'lt',
  IS_NULL = 'is_null',
}

export enum LogicalFilterOperatorType {
  TEXT = 'text',
  NUMERIC = 'numeric',
  BOOLEAN = 'boolean',
  DATE_OR_DATETIME = 'date_or_datetime',
  ARRAY = 'array',
  REF = 'ref',
}
