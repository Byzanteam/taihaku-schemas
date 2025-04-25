import type { JSONSchema } from '../../primitive.ts'
import type { FieldType } from '../field.ts'
import type { ObjectData } from '../types.ts'
import type { ObjectLayout } from './layout.ts'
import type {
  CustomFieldUIOptionsMap as BuiltInFieldUIOptionMap,
  FormAppearance,
} from './ui_options.ts'

/**
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/api-link/uiSchema#submitbuttonoptions
 */
interface SubmitButtonOptions {
  norender: boolean
  submitText: string
  props: {
    disabled?: boolean
  }
}

type ObjectFieldUIOptions<O extends ObjectData> = {
  'ui:order'?: Array<keyof O>
  // x-layout 存在时，order 将无效
  'ui:x-layout'?: ObjectLayout<O> | Array<ObjectLayout<O>>
}

// TODO: define array field options
type ArrayFieldUIOptions =
  // deno-lint-ignore ban-types
  {
    // 'ui:x-hideAddButton'?: boolean
  }

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

type FormUIOptions = {
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
> = MT extends FieldType ? BuiltInFieldUIOptionMap[MT] & {
    'ui:widget': `${MT}Widget`
  } & BasicUIOptions
  : MT extends keyof TCustomUIOptionMap ?
      & {
        'ui:widget': MT
      }
      & TCustomUIOptionMap[MT]
      & BasicUIOptions
  : never

/**
 * 当面对值为 object 类型时有两种处理方式
 * 1. 用组件完全接管整个对象的值，即将这个对象当作一个值来看待
 * 2. 将对象当作一个可遍历的元素看待，递归渲染（rjsf 默认的行为）
 *
 * 情况 1 时必有 ui:widget 参数，没有 ui:widget 参数时为第二种情况。
 */
type ObjectUISchema<
  O extends ObjectData,
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
> =
  | FieldUIOptions<T, TCustomUIOptionMap> // 作为整体看待时
  | (
    & {
      [K in keyof O]?: FieldUISchema<O[K], T, TCustomUIOptionMap>
    }
    & ObjectFieldUIOptions<O>
  ) // 作为可遍历的元素看待

/**
 * 对象数组也可以当整体来看待，或当可遍历的的元素看待
 */
type ArrayUISchema<
  TItem,
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
> =
  | FieldUIOptions<T, TCustomUIOptionMap> // 视为整体看待
  | ({
    items: FieldUISchema<TItem, T, TCustomUIOptionMap>
  } & ArrayFieldUIOptions) // 当可遍历的元素看待，此时必须设置 items 如何渲染

type FieldUISchema<
  O,
  T extends FieldType,
  TCustomUIOptionMap extends UIOptionMap,
> = O extends object
  ? O extends Array<infer U> | ReadonlyArray<infer U>
    ? U extends ObjectData ? ArrayUISchema<U, T, TCustomUIOptionMap> // For Array
    : FieldUIOptions<T, TCustomUIOptionMap> // Normal Array like checkbox
  : O extends ObjectData ? ObjectUISchema<O, T, TCustomUIOptionMap> // nested object, such as person.profile
  : never
  : FieldUIOptions<T, TCustomUIOptionMap>

export type FormUISchema<
  O extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> =
  & {
    [K in keyof O]?: FieldUISchema<O[K], FieldType, TCustomUIOptionMap>
  }
  & FormUIOptions
  & ObjectFieldUIOptions<O>
  & BasicUIOptions

export type {
  ArrayFieldUIOptions,
  BuiltInFieldUIOptionMap,
  ObjectFieldUIOptions,
}

export type {
  DateMatcherString,
  DisabledDateMatcher,
  OptionColumns,
} from './ui_options.ts'

export type FormSchema<
  TData extends ObjectData = ObjectData,
  TCustomUIOptionMap extends UIOptionMap = Record<never, ObjectData>,
> = {
  schema: JSONSchema
  uiSchema?: FormUISchema<TData, TCustomUIOptionMap>
}
