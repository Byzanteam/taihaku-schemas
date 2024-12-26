import type { COFilter } from './co.ts'
import type { EQFilter } from './eq.ts'
import type { IsNullFilter } from './is-null.ts'
import type { LTFilter } from './lt.ts'

export type LogicalFilter = COFilter | EQFilter | IsNullFilter | LTFilter

export * from './co.ts'
export * from './eq.ts'
export * from './is-null.ts'
export * from './lt.ts'
