import type { JSONSchema } from '../../primitive.ts'
import type { FieldType } from '../field.ts'
import type { ObjectData } from '../types.ts'
import type { ObjectLayout } from './layout.ts'
import type {
  CommonCustomFieldUIOptions,
  CustomFieldUIOptionsMap,
  FormAppearance,
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

type ObjectFieldUIOptions<O extends ObjectData> =
  & {
    'ui:order'?: Array<keyof O>
    // x-layout 存在时，order 将无效
    'ui:x-layout'?: ObjectLayout<O> | Array<ObjectLayout<O>>
  }
  & CommonCustomFieldUIOptions
  & BasicUIOptions

// TODO: define array field options
type ArrayFieldUIOptions =
  // deno-lint-ignore ban-types
  & {
    // 'ui:x-hideAddButton'?: boolean
  }
  & CommonCustomFieldUIOptions
  & BasicUIOptions

/**
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
type BasicUIOptions = {
  'ui:autocomplete'?: 'on' | 'off'
  'ui:autofocus'?: boolean
  'ui:disabled'?: boolean
  'ui:enumDisabled'?: Array<string | number>
  'ui:hideError'?: boolean
  /** Used to change the input type (for example, `tel` or `email`) for an <input> */
  'ui:inputType'?: string
  'ui:label'?: boolean
  'ui:placeholder'?: string
  'ui:readonly'?: boolean
}

type GlobalUIOptions = {
  'ui:x-appearance'?: FormAppearance
  disabled?: boolean
  readonly?: boolean
}

type FormUIOptions<O extends ObjectData> =
  & ObjectFieldUIOptions<O>
  & BasicUIOptions
  & {
    'ui:rootFieldId'?: string
    'ui:submitButtonOptions'?: Partial<SubmitButtonOptions>
    'ui:globalOptions'?: GlobalUIOptions
  }

type UIOptionMap = {
  [key: string]: ObjectData
}

// 这里添加 T extends FieldType ? M<T> : never 的目的是为了让 ts 遍历
// 得到 Union 类型。即 M<FieldType.RadioButton> | M<FieldType.Checkbox> | ...
// 否则得到的是 M<FieldType>
type FieldUIOptions<
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
  MT = T | keyof TCustomUIOptionMap,
> = MT extends FieldType ? CustomFieldUIOptionsMap[MT] & {
    'ui:widget': `${MT}Widget`
  } & BasicUIOptions
  : MT extends keyof TCustomUIOptionMap ?
      & {
        'ui:widget': MT
      }
      & TCustomUIOptionMap[MT]
      & BasicUIOptions
  : never

type FieldsUISchema<
  O extends ObjectData,
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
> = {
  [K in keyof O]: O[K] extends object // 嵌套结构（object or array)
    ? O[K] extends Array<infer U> // array
      ? U extends ObjectData ?
          & {
            /** define ArrayItem's uiSchema */
            items?:
              & Partial<FieldsUISchema<U, T, TCustomUIOptionMap>>
              & ObjectFieldUIOptions<U>
            // array type value can set ui:widget, but it is optional
          }
          & Partial<FieldUIOptions<T, TCustomUIOptionMap>>
          & ArrayFieldUIOptions // Array<object>
      : FieldUIOptions<T, TCustomUIOptionMap> & ArrayFieldUIOptions // normal array field like checkbox
    : O[K] extends ObjectData ?
        & Partial<FieldsUISchema<O[K], T, TCustomUIOptionMap>>
        & ObjectFieldUIOptions<O[K]> // nested object
    : FieldUIOptions<T, TCustomUIOptionMap> // fallback type
    : FieldUIOptions<T, TCustomUIOptionMap> // normal field
}

export type FormUISchema<
  O extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> =
  & Partial<FieldsUISchema<O, FieldType, TCustomUIOptionMap>>
  & Partial<FormUIOptions<O>>

export type {
  ArrayFieldUIOptions,
  CustomFieldUIOptionsMap,
  ObjectFieldUIOptions,
}

export { type OptionColumns } from './ui_options.ts'

export type FormSchema<
  TData extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> = {
  schema: JSONSchema
  uiSchema?: FormUISchema<TData, TCustomUIOptionMap>
}
