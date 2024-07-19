import type { DataPointer, ValuePointer } from './types.ts'

export interface OffsetPagination {
  offset: DataPointer | ValuePointer
  limit: DataPointer | ValuePointer
}
