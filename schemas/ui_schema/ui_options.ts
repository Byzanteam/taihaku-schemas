import { FieldType } from './field_type.ts'

enum AppearanceValue {
  Input = 'input',
  Presentation = 'presentation',
}

interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: AppearanceValue
  'ui:x-blankslate'?: string
}
interface SignatureFieldUIOptions extends CommonCustomFieldUIOptions {
  /**
   * The size of canvas
   * by default, width is auto (full width of container)
   * height is 200px
   */
  'ui:x-width'?: number | 'auto'
  'ui:x-height'?: number
  /** the pen color */
  'ui:x-penColor'?: string
  /** the background color of canvas */
  'ui:x-backgroundColor'?: string
}

type ColumnNumber = 1 | 2 | 3 | 4

type RadioButtonFieldUIOptions =
  & (
    | {
      'ui:x-display'?: 'radio'
      'ui:x-columns'?: ColumnNumber
    }
    | {
      'ui:x-display'?: 'select'
    }
  )
  & CommonCustomFieldUIOptions

interface DateFieldUIOptions extends CommonCustomFieldUIOptions {
  'ui:x-format'?: string
}

interface CheckBoxFieldUIOptions extends CommonCustomFieldUIOptions {
  'ui:x-columns'?: ColumnNumber
}

type DateTimeFieldUIOptions = DateFieldUIOptions

export type CustomFieldUIOptionsMap = {
  [FieldType.Checkbox]: CheckBoxFieldUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.RadioButton]: RadioButtonFieldUIOptions
  [FieldType.Signature]: SignatureFieldUIOptions
  [FieldType.SingleLine]: object
}
