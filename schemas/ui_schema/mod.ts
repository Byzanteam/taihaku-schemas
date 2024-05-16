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

interface LayoutCell<O extends object> {
  // fill 表示占剩余的 1 份，如果同一行有多个定义为 fill，那么他们应该等分。
  // 如果同一行有元素隐藏了，那么 fill 会扩张
  // 为 nunber 时，表示占宽度占据的栅格数
  span: number | 'fill'
  field: keyof O
  rowSpan?: number
}

interface LayoutGroup<O extends object, S extends Record<string, number>> {
  title: string
  rows: Record<'default' | keyof S, Array<Array<LayoutCell<O>>>>
}

interface ObjectPropertiesLayout<
  O extends object,
  S extends Record<string, number>
> {
  // 定义栅格数量
  columns: number
  // m <==> [m, m]
  gap: number | [number, number]
  // 定义断点
  screens: S
  groups: Array<LayoutGroup<O, S>>
}

interface ObjectFieldUIOptions<
  O extends object,
  S extends Record<string, number>
> {
  layout?: ObjectPropertiesLayout<O, S>
  // 定义字段的显示顺序，这个为可选项，与 layout 互斥
  order?: Array<string>
}

type FieldUIOptions<O extends object, S extends Record<string, number>> =
  | ObjectFieldUIOptions<O, S>
  | Record<string, unknown>

// 未完全定义所有支持的属性，这里主要罗列了我们可能会使用的属性
interface BasicOptions {
  // title 与 description 属于可选属性。
  // 如果没有定义，则使用 JSONSchema 定义的 title/description
  'ui:title': string
  'ui:description': string
  'ui:disabled': boolean
  'ui:readonly': boolean
  // 是否隐藏错误的显示
  'ui:hideError': boolean
  // 控制 label 的展示
  'ui:label': boolean
}

interface FormOptions<O extends object, S extends Record<string, number>>
  extends ObjectFieldUIOptions<O, S> {
  submitButtonOptions: Partial<SubmitButtonOptions>
}

interface FieldSchema<O extends object, S extends Record<string, number>>
  extends BasicOptions {
  /**
   * ui:option.xxxx 与 ui:xxxx 是等价的
   * 以下写成 FieldUIOptions & Partial<FieldOptions> 的目的是区分开
   * 内置支持的 Options 与自定义的 ui options，通常我们期望将内置的 options
   * 写成 ui:xxxx。ui:options 中只保留自定义的 ui options
   */
  'ui:options': FieldUIOptions<O, S>
  'ui:widget': string // enum of FieldType
  'ui:placeholder': string
  // 未完全罗列所有的 ui 参数
  // 具体参考 https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
}

type FieldsSchema<O extends object, S extends Record<string, number>> = {
  [K in keyof O]: Partial<FieldSchema<O, S>>
}

/**
 * UISchema 定义了 Form 与 Fields 等相关的 UI 设置
 */
export type UISchema<
  O extends object,
  S extends Record<string, number>
> = Partial<BasicOptions> &
  FieldsSchema<O, S> & {
    // 传递给 Form 的 options
    'ui:options': Partial<FormOptions<O, S>>
  }
