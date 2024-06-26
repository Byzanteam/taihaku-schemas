import type { FieldType, GenericField } from '../field.ts'

type ObjectData = {
  [key: string]: unknown
}

type FieldUIOptions<TData extends ObjectData> = {
  [K in keyof TData]?: {
    /** define how to render current field */
    'ui:widget'?: `${FieldType}Widget`
    /**
     * The size of current field with px unit
     * default size setting should be provide by render component
     */
    'ui:size'?: number
    /**
     * The min size of current field with px unit
     * default min-size setting should be provide by render component
     */
    'ui:min-size'?: number
    /**
     * The max size of current field with px unit
     * default max-size setting should be provide by render component
     */
    'ui:max-size'?: number
    /** allow user resize the field width */
    'ui:enable-resizing'?: boolean
    /**
     * TODO: define custom ui options
     * @example
     *  'ui:widget': 'DateFieldUIOptions'
     *  'ui:x-format': 'YYYY-mm-dd'
     */
  }
}

interface TableOptions<TData extends ObjectData> {
  /** The order of table columns(fields) */
  'ui:order': Array<keyof TData>
  /**
   * The pinning settings
   * 'ui:order' only affect the unpinned fields
   */
  'ui:pinning': {
    left?: Array<keyof TData> /** Field names */
    right?: Array<keyof TData> /** Field names */
  }
  /** The visibility settings */
  'ui:visibility': {
    /**
     * field is visible if it set to true or undefined.
     * field is invisible if it set to false
     * key is the field name
     */
    [K in keyof TData]?: boolean
  }
}

export type TableUISchema<TData extends ObjectData> =
  & Partial<
    TableOptions<TData>
  >
  & FieldUIOptions<TData>

export type TableSchema<TData extends ObjectData> = {
  /** uniqueId of a schema */
  id: string
  name?: string
  fields: {
    [K in keyof TData]?: GenericField<K, FieldType>
  }
  uiSchema?: TableUISchema<TData>
}
