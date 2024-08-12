import type { DataPointer, SchemaPointer, ValuePointer } from './types.ts'
export type Filter = ConditionalFilter | LogicalFilter

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

export interface ConditionalFilter {
  operator: ConditionalFilterOperator
  operands: Array<ConditionalFilter | LogicalFilter>
}

export type LogicalFilter = COFilter | EQFilter | LTFilter | IsNullFilter

export interface COFilter {
  operator: LogicalFilterOperator.CO
  operands: [Operand, Operand]
}

export interface EQFilter {
  operator: LogicalFilterOperator.EQ
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: LogicalFilterOperator.LT
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: LogicalFilterOperator.IS_NULL
  operands: [Operand]
}

export type Operand = DataPointer | SchemaPointer | ValuePointer
