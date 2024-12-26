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

export enum LogicalFilterOperatorType {
  TEXT = 'text',
  NUMERIC = 'numeric',
  BOOLEAN = 'boolean',
  DATE_AND_DATETIME = 'date_and_datetime',
  ARRAY = 'array',
}

export interface ConditionalFilter {
  operator: `${ConditionalFilterOperator}`
  operands: Array<ConditionalFilter | LogicalFilter>
}

export type LogicalFilter = COFilter | EQFilter | LTFilter | IsNullFilter

export interface COFilter {
  operator: {
    type: `${LogicalFilterOperatorType}`
    value: `${LogicalFilterOperator.CO}`
  }
  operands: [Operand, Operand]
}

export interface EQFilter {
  operator: {
    type: `${LogicalFilterOperatorType}`
    value: `${LogicalFilterOperator.EQ}`
  }
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: {
    type: `${Exclude<
      LogicalFilterOperatorType,
      LogicalFilterOperatorType.ARRAY | LogicalFilterOperatorType.BOOLEAN
    >}`
    value: `${LogicalFilterOperator.LT}`
  }
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: {
    type: `${LogicalFilterOperatorType}`
    value: `${LogicalFilterOperator.IS_NULL}`
  }
  operands: [Operand]
}

export type Operand = DataPointer | SchemaPointer | ValuePointer
