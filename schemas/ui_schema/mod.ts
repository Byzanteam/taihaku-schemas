import { FieldType } from './field_type.ts'
import { CustomFieldUIOptionsMap } from './ui_options.ts'

interface SubmitButtonOptions {
  // 是否渲染提交按钮
  norender: boolean
  submitText: string
  // 传递给 SubmitButton 组件的参数
  props: {
    disabled: boolean
  }
}

type ObjectFieldUIOptions = {
  'ui:order'?: Array<string>
}

// 具体参考 https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
type BasicUIOptions = {
  'ui:disabled'?: boolean
  'ui:readonly'?: boolean
  // 是否隐藏错误的显示
  'ui:hideError'?: boolean
  // 控制 label 的展示
  'ui:label'?: boolean
  'ui:autocomplete'?: 'on' | 'off'
  'ui:autofocus'?: boolean
  'ui:placeholder'?: string
  'ui:enumDisabled'?: Array<string | number>
}

type FormUIOptions =
  & ObjectFieldUIOptions
  & BasicUIOptions
  & {
    'ui:submitButtonOptions'?: Partial<SubmitButtonOptions>
  }

/**
 * 这里添加 T extends FieldType ? M<T> : never 的目的是为了让 ts 遍历
 * 得到 Union 类型。即 M<FieldType.RadioButton> | M<FieldType.Checkbox> | ...
 * 否则得到的是 M<FieldType>
 */
type FieldUIOptions<T extends FieldType> = T extends FieldType
  ? CustomFieldUIOptionsMap[T] & {
    'ui:widget': `${T}Widget`
  } & BasicUIOptions
  : never

type FieldsUISchema<
  O extends Record<string, unknown>,
  T extends FieldType = FieldType,
> = {
  [K in keyof O]: O[K] extends object // 嵌套结构（object or array)
    ? O[K] extends Array<infer U> // array
      ? U extends Record<string, unknown> ? { items: UISchema<U> } // Array<object>
      : FieldUIOptions<T> // normal array field like checkbox
    : O[K] extends Record<string, unknown> ? UISchema<O[K]> // nested object
    : FieldUIOptions<T> // fallback type
    : FieldUIOptions<T> // normal field
}

/**
 * UISchema 定义了 Form(Object) 与 Fields 等相关的 UI 设置
 */
export type UISchema<O extends Record<string, unknown>> =
  & Partial<
    FieldsUISchema<O>
  >
  & Partial<FormUIOptions>
