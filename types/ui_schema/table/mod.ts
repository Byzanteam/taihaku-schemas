import type { FieldType, GenericField } from '../field.ts'

type ObjectData = {
  [key: string]: unknown
}

type FieldUIOptions<TData extends ObjectData> = {
  [K in keyof TData]?: {
    /** define how to render current field */
    widget?: `${FieldType}Widget`
    /** define size and resize of current field */
    size?: number
    minSize?: number
    enableResizing?: boolean
    maxSize?: number
  }
}

interface TableOptions<TData extends ObjectData> {
  /** initial order of table columns(fields) */
  order: Array<keyof TData>
  /** initial pinning settings */
  pinning: {
    left?: Array<keyof TData>
    right?: Array<keyof TData>
  }
  /** initial visibility settings */
  columnVisibility: {
    [K in keyof TData]?: boolean
  }
}

export type TableUISchema<TData extends ObjectData> = Partial<
  TableOptions<TData>
> &
  Partial<FieldUIOptions<TData>>

export type TableSchema<TData extends ObjectData> = {
  /** uniqueId of a schema */
  id: string
  name?: string
  fields: {
    [K in keyof TData]: GenericField<K, FieldType>
  }
  uiSchema?: TableUISchema<TData>
}
