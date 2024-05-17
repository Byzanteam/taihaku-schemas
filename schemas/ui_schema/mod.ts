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

interface LayoutCell<O extends Record<string, unknown>> {
  // fill 表示占剩余的 1 份，如果同一行有多个定义为 fill，那么他们应该等分。
  // 如果同一行有元素隐藏了，那么 fill 会扩张
  // 为 number 时，表示占宽度占据的栅格数
  // 建议一行中仅出现一个 fill，避免多个 fill 导致出现非整数栅格数的情况。
  // 除非你明确知道不会出现非整数的栅格数
  span: number | 'fill'
  field: keyof O
  rowSpan?: number
}

// tailwindcss breakpoints
type Screens = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface LayoutGroup<O extends Record<string, unknown>> {
  title: string
  rows: {
    default: Array<Array<LayoutCell<O>>>
  } & Partial<{
    [K in Screens]: Array<Array<LayoutCell<O>>>
  }>
}

interface ObjectPropertiesLayout<O extends Record<string, unknown>> {
  // 定义栅格数量
  columns: number
  // m <==> [m, m], 单位为 px
  gap: number | [number, number]
  groups: Array<LayoutGroup<O>>
}

interface ObjectFieldUIOptions<O extends Record<string, unknown>> {
  layout?: ObjectPropertiesLayout<O>
  // 定义字段的显示顺序，这个为可选项，与 layout 互斥，同时存在时，order 不会生效
  order?: Array<string>
}

interface SignatureFieldUIOptions {
  /**
   * The size of canvas
   * by default, width is auto (full width of container)
   * height is 200px
   */
  width?: number | 'auto'
  height?: number
  // the pen color
  penColor?: string
  // the background color of canvas
  backgroundColor?: string
}

type ColumnNumber = 1 | 2 | 3 | 4

type RadioButtonFieldUIOptions =
  | {
      display: 'radio'
      columns?: ColumnNumber
    }
  | {
      display: 'select'
    }

interface DateFieldUIOptions {
  format?: string
}

interface CheckBoxFieldUIOptions {
  columns?: ColumnNumber
}

type DateTimeFieldUIOptions = DateFieldUIOptions

type FieldUIOptions<O extends Record<string, unknown>> =
  | CheckBoxFieldUIOptions
  | DateFieldUIOptions
  | DateTimeFieldUIOptions
  | ObjectFieldUIOptions<O>
  | RadioButtonFieldUIOptions
  | SignatureFieldUIOptions

// 未完全定义所有支持的属性，这里主要罗列了我们可能会使用的属性
interface BasicOptions {
  'ui:disabled': boolean
  'ui:readonly': boolean
  // 是否隐藏错误的显示
  'ui:hideError': boolean
  // 控制 label 的展示
  'ui:label': boolean
}

interface FormOptions<O extends Record<string, unknown>>
  extends ObjectFieldUIOptions<O> {
  submitButtonOptions: Partial<SubmitButtonOptions>
}

interface FieldSchema<O extends Record<string, unknown>> extends BasicOptions {
  /**
   * ui:option.xxxx 与 ui:xxxx 是等价的, 为了区分内置支持的 Options 与自定义的 ui options
   * 通常我们期望将内置的 options 写成 ui:xxxx。ui:options 中只保留自定义的 ui options
   */
  'ui:options': FieldUIOptions<O>
  'ui:widget': string // enum of FieldType
  'ui:placeholder': string
  // 未完全罗列所有的 ui 参数
  // 具体参考 https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
}

type FieldsSchema<O extends Record<string, unknown>> = {
  [K in keyof O]: O[K] extends Record<string, unknown>
    ? Partial<UISchema<O[K]>> // support nested object
    : Partial<FieldSchema<O>>
}

/**
 * UISchema 定义了 Form(Object) 与 Fields 等相关的 UI 设置
 */
export type UISchema<O extends Record<string, unknown>> =
  Partial<BasicOptions> &
    FieldsSchema<O> & {
      // 传递给 Form(Object) 的 options
      'ui:options': Partial<FormOptions<O>>
    }
