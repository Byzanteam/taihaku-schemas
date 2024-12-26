import type { LogicalFilter } from './logical-filter/mod.ts'
import type { ConditionalFilter } from './conditional-filter/mod.ts'

export type Filter = LogicalFilter | ConditionalFilter

export * from './logical-filter/mod.ts'
export * from './conditional-filter/mod.ts'
export * from './types.ts'
