import type { FieldType } from './field_type.ts'
import type { FieldTemplate } from './layout.ts'

export enum AppearanceValue {
  Input = 'input',
  Presentation = 'presentation',
}

export interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: AppearanceValue
  'ui:x-blankslate'?: string
  'ui:x-field-template'?: FieldTemplate | Array<FieldTemplate>
}

type SingleLineFieldUIOptions = CommonCustomFieldUIOptions

interface SignatureFieldUIOptions extends CommonCustomFieldUIOptions {
  'ui:x-padDescription'?: string
  'ui:x-clearText'?: string
  'ui:x-saveText'?: string
  'ui:x-cancelText'?: string
  /** the pen color */
  'ui:x-penColor'?: string
  /** the background color of canvas */
  'ui:x-backgroundColor'?: string
}

/** The number of columns for options in radio button or check box fields. */
export type OptionColumns = 1 | 2 | 3 | 4

type RadioButtonFieldUIOptions =
  & (
    | {
      'ui:x-display'?: 'radio'
      'ui:x-columns'?: OptionColumns
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
  'ui:x-columns'?: OptionColumns
}

type DateTimeFieldUIOptions = DateFieldUIOptions

type NumericFieldUIOptions = CommonCustomFieldUIOptions

export type CustomFieldUIOptionsMap = {
  [FieldType.Checkbox]: CheckBoxFieldUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.Numeric]: NumericFieldUIOptions
  [FieldType.RadioButton]: RadioButtonFieldUIOptions
  [FieldType.Signature]: SignatureFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
}
