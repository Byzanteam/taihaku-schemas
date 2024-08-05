import type { FieldType, GenericField } from '../field.ts'
import type { ObjectData } from '../types.ts'
import type { CustomColumnUIOptionsMap } from './ui_options.ts'

type BasicUIOptions = {
  /**
   * @link https://tanstack.com/table/latest/docs/guide/column-sizing#column-widths
   * The size of current column
   * usually interpreted as pixel unit values with number type
   * if it set as string, interpreted as css styles.
   * default size setting should be provide by render component
   */
  'ui:size'?: number | string
  /**
   * The min size of current column
   * enforced during column resizing
   * default min-size setting should be provide by render component
   */
  'ui:min-size'?: number | string
  /**
   * The max size of current column
   * enforced during column resizing
   * default max-size setting should be provide by render component
   */
  'ui:max-size'?: number | string
  /** allow user resize the column width */
  'ui:enable-resizing'?: boolean
}

type UIOptionMap = {
  [key: string]: ObjectData
}

// 这里添加 T extends FieldType ? M<T> : never 的目的是为了让 ts 遍历
// 得到 Union 类型。即 M<FieldType.RadioButton> | M<FieldType.Checkbox> | ...
// 否则得到的是 M<FieldType>
type ColumnUIOptions<
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
  MT = T | keyof TCustomUIOptionMap,
> = MT extends FieldType ?
    & CustomColumnUIOptionsMap[MT]
    & BasicUIOptions
    & {
      /** define how to render current column */
      'ui:widget': `${MT}Widget`
    }
  : MT extends keyof TCustomUIOptionMap ?
      & TCustomUIOptionMap[MT]
      & BasicUIOptions
      & {
        'ui:widget': MT
      }
  : never

interface TableOptions<TData extends ObjectData = ObjectData> {
  /** The order of table columns */
  'ui:column-order': Array<keyof TData>
  /**
   * The pinning settings
   * 'ui:order' only affect the unpinned columns
   */
  'ui:column-pinning': {
    left?: Array<keyof TData> /** Column names */
    right?: Array<keyof TData> /** Column names */
  }
  /** The visibility settings */
  'ui:column-visibility': {
    /**
     * column is visible if it set to true or undefined.
     * column is invisible if it set to false
     * key is the column name
     */
    [K in keyof TData]?: boolean
  }
  /**
   * global appearance setting of table cells
   */
  'ui:x-appearance': 'input' | 'presentation'
}

export type TableUISchema<
  TData extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> =
  & Partial<TableOptions<TData>>
  & {
    [K in keyof TData]?: ColumnUIOptions<FieldType, TCustomUIOptionMap>
  }

export type TableSchema<
  TData extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> = {
  /** uniqueId of a schema */
  id: string
  name?: string
  columns: {
    /** column name */
    [K in keyof TData]?: GenericField<K, FieldType>
  }
  uiSchema?: TableUISchema<TData, TCustomUIOptionMap>
}
