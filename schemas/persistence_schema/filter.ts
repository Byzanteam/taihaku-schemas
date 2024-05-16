import { $DataPointer, $SchemaPointer, $ValuePointer } from './types.ts'

export type Operand = $DataPointer | $ValuePointer | $SchemaPointer

export interface EQFilter {
  operator: 'EQ'
  operands: [Operand, Operand]
}

export interface LTFilter {
  operator: 'LT',
  operands: [Operand, Operand]
}

export interface IsNullFilter {
  operator: 'IS_NULL'
  operands: [Operand]
}

export type Filter = EQFilter | LTFilter | IsNullFilter
