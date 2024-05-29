import type { $DataPointer, $SchemaPointer, $ValuePointer } from './types.ts'

export type Filter = ConditionalFilter | LogicalFilter

export interface ConditionalFilter {
  operator: 'AND' | 'OR'
  operands: Array<ConditionalFilter | LogicalFilter>
}

export type LogicalFilter = EQFilter | LTFilter | IsNullFilter

export interface EQFilter {
  operator: 'EQ'
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: 'LT'
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: 'IS_NULL'
  operands: [Operand]
}

export type Operand = $DataPointer | $ValuePointer | $SchemaPointer
