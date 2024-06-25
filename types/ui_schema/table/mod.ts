import { FieldType, type GenericField } from '../field.ts'

type ObjectData = {
  [key: string]: unknown
}

type FieldUISchema<TData extends ObjectData> = {
  [K in keyof TData]?: {
    size?: number
    minSize?: number
    enableResizing?: boolean
    maxSize?: number
  }
}

interface TableOptions<TData extends ObjectData> {
  order: Array<keyof TData>
  pinning: {
    left?: Array<keyof TData>
    right?: Array<keyof TData>
  }
  columnVisibility: {
    [K in keyof TData]?: boolean
  }
}

type Fields<TData extends ObjectData> = {
  [K in keyof TData]: GenericField<K, FieldType>
}

export type TableUISchema<TData extends ObjectData> =
  & Partial<
    TableOptions<TData>
  >
  & Partial<FieldUISchema<TData>>

export type TableSchema<TData extends ObjectData> = {
  id: string
  name?: string
  fields: Fields<TData>
  uiSchema?: TableUISchema<TData>
}
