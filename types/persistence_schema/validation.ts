import type { JSONPointer } from '../primitive.ts'
import type { EQFilter, IsNullFilter, Operand } from './filter.ts'
import type { $SchemaPointer } from './types.ts'

export interface BaseValidation {
  /**
   * the key to which changeset error will be added when validation fails,
   * defaults to the first operand name of the given list of operands.
   */
  errorKey?: JSONPointer
  /**
   * error message template.
   */
  errorMessage?: string
}

export interface EQValidation extends BaseValidation, EQFilter {}
export interface IsNullValidation extends BaseValidation, IsNullFilter {}

export interface UniqueValidation extends BaseValidation {
  operator: 'UNIQUE'
  operands: Array<$SchemaPointer>
  constraintName?: string // the unique constraint name
}

export interface CustomValidation extends BaseValidation {
  operator: 'CUSTOM'
  operands: Array<Operand>
  expression: string // the JavaScript expression to be evaluated
}

/**
 * The filter-based validation
 */
export type Validation =
  | EQValidation
  | IsNullValidation
  | UniqueValidation
  | CustomValidation
