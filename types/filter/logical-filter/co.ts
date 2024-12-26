import type {
  DataPointer,
  SchemaPointer,
  ValuePointer,
} from '../../persistence_schema/mod.ts'
import type {
  LogicalFilterOperator,
  LogicalFilterOperatorType,
  Operand,
} from '../types.ts'

export interface ArrayCoFilter {
  operator: `${LogicalFilterOperatorType.ARRAY}_${LogicalFilterOperator.CO}`
  operands: [Operand, ValuePointer<Array<unknown>>]
}

export interface RefCoFilter {
  operator: `${LogicalFilterOperatorType.ARRAY}_${LogicalFilterOperator.CO}`
  operands: [Operand, SchemaPointer | DataPointer]
}

export type COFilter = ArrayCoFilter | RefCoFilter
