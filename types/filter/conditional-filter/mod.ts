import type { LogicalFilter } from '../logical-filter/mod.ts'
import type { ConditionalFilterOperator } from '../types.ts'

export interface ConditionalFilter {
  operator: `${ConditionalFilterOperator}`
  operands: Array<ConditionalFilter | LogicalFilter>
}
