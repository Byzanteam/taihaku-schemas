import type { DataPointer, SchemaPointer, ValuePointer } from './types.ts'
export type Filter = ConditionalFilter | LogicalFilter

export interface ConditionalFilter {
  operator: 'and' | 'or'
  operands: Array<ConditionalFilter | LogicalFilter>
}

export type LogicalFilter = EQFilter | LTFilter | IsNullFilter

export interface EQFilter {
  operator: 'eq'
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: 'lt'
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: 'is_null'
  operands: [Operand]
}

export type Operand = DataPointer | SchemaPointer | ValuePointer
