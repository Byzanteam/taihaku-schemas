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

export interface TextLtFilter {
  operator: `${LogicalFilterOperatorType.TEXT}_${LogicalFilterOperator.LT}`
  operands: [Operand, ValuePointer<string>]
}

export interface NumericLtFilter {
  operator: `${LogicalFilterOperatorType.NUMERIC}_${LogicalFilterOperator.LT}`
  operands: [Operand, ValuePointer<number>]
}

export interface DateOrDatetimeLtFilter {
  operator:
    `${LogicalFilterOperatorType.DATE_OR_DATETIME}_${LogicalFilterOperator.LT}`
  operands: [Operand, ValuePointer<Date>]
}

export interface RefLtFilter {
  operator: `${LogicalFilterOperatorType.REF}_${LogicalFilterOperator.LT}`
  operands: [Operand, SchemaPointer | DataPointer]
}

export type LTFilter =
  | TextLtFilter
  | NumericLtFilter
  | DateOrDatetimeLtFilter
  | RefLtFilter
