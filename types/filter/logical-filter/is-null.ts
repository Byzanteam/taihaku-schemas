import type { LogicalFilterOperator, Operand } from '../types.ts'

export interface IsNullFilter {
  operator: `${LogicalFilterOperator.IS_NULL}`
  operands: [Operand]
}
