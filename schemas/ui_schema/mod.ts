// 未完全罗列
interface SubmitButtonOptions {
  // 是否渲染提交按钮
  norender: boolean
  submitText: string
  // 传递给 SubmitButton 组件的参数
  props: {
    disabled: boolean
  }
}

type FieldUIOptions = Record<string, unknown>

// 未完全定义所有支持的属性，这里主要罗列了我们可能会使用的属性
interface FieldOptions {
  // title 与 description 属于可选属性。
  // 如果没有定义，则使用 JSONSchema 定义的 title/description
  title: string
  description: string
  disabled: boolean
  readonly: boolean
  // 是否隐藏错误的显示
  hideError: boolean
  // 控制 label 的展示
  label: boolean
  // 定义字段的显示顺序，这个为可选项，可能会使用 layout 来替代这个能力
  // order 属性只适用于 object 的类型
  order: Array<string>
}

export interface FormOptions extends FieldOptions {
  submitButtonOptions: Partial<SubmitButtonOptions>
}

interface FieldUISchema extends FieldOptions {
  /**
   * ui:option.xxxx 与 ui:xxxx 是等价的
   * 以下写成 FieldUIOptions & Partial<FieldOptions> 的目的是区分开
   * 内置支持的 Options 与自定义的 ui options，通常我们期望将内置的 options
   * 写成 ui:xxxx。ui:options 中只保留自定义的 ui options
   */
  'ui:options': FieldUIOptions & Partial<FieldOptions>
  'ui:widget': string // enum of FieldType
  'ui:placeholder': string
  // 未完全罗列所有的 ui 参数
  // 具体参考 https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
}

/**
 * UISchema 定义了 Form 与 Fields 等相关的 UI 设置
 *
 * 以下用 TS 表达不出来，ts 会认为 'ui:options' 与 index signature 不兼容
 * 这里想表达的意思就是 ui:options 是定义给 form 使用，其余的定义给 field 使用
 */
export interface UISchema {
  // 传递给 Form 的 options
  'ui:options': Partial<FormOptions>
  [fieldName: string]: Partial<FieldUISchema>
}
