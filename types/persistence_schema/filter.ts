import type { DataPointer, SchemaPointer, ValuePointer } from './types.ts'
export type Filter = ConditionalFilter | LogicalFilter

export enum ConditionalFilterOperator {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

export enum LogicalFilterOperator {
  // 数组包含
  IN = 'in',
  // 字符串包含
  CO = 'co',
  EQ = 'eq',
  LT = 'lt',
  LTE = 'lte',
  GT = 'gt',
  GTE = 'gte',
  IS_NULL = 'is_null',
  OV = 'ov',
  SW = 'sw',
  EW = 'ew',
}

export interface ConditionalFilter {
  operator: `${ConditionalFilterOperator}`
  operands: Array<ConditionalFilter | LogicalFilter>
}

export type LogicalFilter =
  | COFilter
  | EQFilter
  | LTFilter
  | LTEFilter
  | GTFilter
  | GTEFilter
  | IsNullFilter
  | OVFilter
  | SWFilter
  | EWFilter
  | INFilter

export interface COFilter {
  operator: `${LogicalFilterOperator.CO}`
  operands: [Operand, Operand]
}

export interface EQFilter {
  operator: `${LogicalFilterOperator.EQ}`
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: `${LogicalFilterOperator.LT}`
  operands: [Operand, Operand]
}

export interface LTEFilter {
  operator: `${LogicalFilterOperator.LTE}`
  operands: [Operand, Operand]
}

export interface GTFilter {
  operator: `${LogicalFilterOperator.GT}`
  operands: [Operand, Operand]
}

export interface GTEFilter {
  operator: `${LogicalFilterOperator.GTE}`
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: `${LogicalFilterOperator.IS_NULL}`
  operands: [Operand]
}

export interface OVFilter {
  operator: `${LogicalFilterOperator.OV}`
  operands: [Operand, Operand]
}

export interface SWFilter {
  operator: `${LogicalFilterOperator.SW}`
  operands: [Operand, Operand]
}

export interface EWFilter {
  operator: `${LogicalFilterOperator.EW}`
  operands: [Operand, Operand]
}

export interface INFilter {
  operator: `${LogicalFilterOperator.IN}`
  operands: [Operand, Operand]
}

export type Operand = DataPointer | SchemaPointer | ValuePointer
