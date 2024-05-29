import { FieldType } from './field_type.ts'
import type { ObjectData, ObjectLayout } from './layout.ts'
import type {
  CommonCustomFieldUIOptions,
  CustomFieldUIOptionsMap,
} from './ui_options.ts'

/**
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/api-link/uiSchema#submitbuttonoptions
 */
interface SubmitButtonOptions {
  norender: boolean
  submitText: string
  props: {
    disabled: boolean
  }
}

type ObjectFieldUIOptions<O extends ObjectData> = {
  'ui:order'?: Array<keyof O>
  // x-layout 存在时，order 将无效
  'ui:x-layout'?: ObjectLayout<O> | Array<ObjectLayout<O>>
} & CommonCustomFieldUIOptions
// TODO: define array field options
// deno-lint-ignore ban-types
type ArrayFieldUIOptions = {
  // 'ui:x-hideAddButton'?: boolean
} & CommonCustomFieldUIOptions

/**
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
type BasicUIOptions = {
  'ui:disabled'?: boolean
  'ui:readonly'?: boolean
  'ui:hideError'?: boolean
  'ui:label'?: boolean
  'ui:autocomplete'?: 'on' | 'off'
  'ui:autofocus'?: boolean
  'ui:placeholder'?: string
  'ui:enumDisabled'?: Array<string | number>
}

type FormUIOptions<O extends ObjectData> =
  & ObjectFieldUIOptions<O>
  & BasicUIOptions
  & {
    'ui:rootFieldId'?: string
    'ui:globalOptions'?: Record<string, unknown>
    'ui:submitButtonOptions'?: Partial<SubmitButtonOptions>
  }

// 这里添加 T extends FieldType ? M<T> : never 的目的是为了让 ts 遍历
// 得到 Union 类型。即 M<FieldType.RadioButton> | M<FieldType.Checkbox> | ...
// 否则得到的是 M<FieldType>
type FieldUIOptions<T extends FieldType> = T extends FieldType
  ? CustomFieldUIOptionsMap[T] & {
    'ui:widget': `${T}Widget`
  } & BasicUIOptions
  : never

type FieldsUISchema<O extends ObjectData, T extends FieldType = FieldType> = {
  [K in keyof O]: O[K] extends object // 嵌套结构（object or array)
    ? O[K] extends Array<infer U> // array
      ? U extends ObjectData ?
          & {
            /** define ArrayItem's uiSchema */
            items: Partial<FieldsUISchema<U>> & ObjectFieldUIOptions<U>
          }
          & ArrayFieldUIOptions
          & BasicUIOptions // Array<object>
      : FieldUIOptions<T> & ArrayFieldUIOptions // normal array field like checkbox
    : O[K] extends ObjectData
      ? Partial<FieldsUISchema<O[K]>> & ObjectFieldUIOptions<O[K]> // nested object
    : FieldUIOptions<T> // fallback type
    : FieldUIOptions<T> // normal field
}

export type UISchema<O extends ObjectData> =
  & Partial<FieldsUISchema<O>>
  & Partial<FormUIOptions<O>>

export type {
  ArrayFieldUIOptions,
  CustomFieldUIOptionsMap,
  ObjectFieldUIOptions,
}

export { FieldType }

export { AppearanceValue, type OptionColumns } from './ui_options.ts'
