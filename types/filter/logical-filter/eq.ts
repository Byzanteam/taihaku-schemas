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

export interface TextEqFilter {
  operator: `${LogicalFilterOperatorType.TEXT}_${LogicalFilterOperator.EQ}`
  operands: [Operand, ValuePointer<string>]
}
export interface NumericEqFilter {
  operator: `${LogicalFilterOperatorType.NUMERIC}_${LogicalFilterOperator.EQ}`
  operands: [Operand, ValuePointer<number>]
}
export interface BooleanEqFilter {
  operator: `${LogicalFilterOperatorType.BOOLEAN}_${LogicalFilterOperator.EQ}`
  operands: [Operand, ValuePointer<boolean>]
}
export interface DateOrDatetimeEqFilter {
  operator:
    `${LogicalFilterOperatorType.DATE_OR_DATETIME}_${LogicalFilterOperator.EQ}`
  operands: [Operand, ValuePointer<Date>]
}
export interface ArrayEqFilter {
  operator: `${LogicalFilterOperatorType.ARRAY}_${LogicalFilterOperator.EQ}`
  operands: [Operand, ValuePointer<Array<unknown>>]
}
export interface RefEqFilter {
  operator: `${LogicalFilterOperatorType.REF}_${LogicalFilterOperator.EQ}`
  operands: [Operand, SchemaPointer | DataPointer]
}

export type EQFilter =
  | TextEqFilter
  | NumericEqFilter
  | BooleanEqFilter
  | DateOrDatetimeEqFilter
  | ArrayEqFilter
  | RefEqFilter
