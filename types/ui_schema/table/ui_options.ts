import type { FieldType } from '../field.ts'

interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: 'input' | 'presentation'
  'ui:x-blankslate'?: string
}

type SingleLineFieldUIOptions = CommonCustomFieldUIOptions

type DateTimeFieldUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-format'?: string
}

type DateFieldUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-format'?: string
}

type RadioButtonUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-options-fallback-style'?: /** className */ string
  'ui:x-options-style'?: Record<
    /** option-value */ string,
    /** className */ string
  >
}

type CheckboxUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-options-fallback-style'?: /** className */ string
  'ui:x-options-style'?: Record<
    /** option-value */ string,
    /** className */ string
  >
}

export type CustomColumnUIOptionsMap = {
  // TODO: define Checkbox to Signature's UIOptions
  [FieldType.Checkbox]: CheckboxUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.Numeric]: CommonCustomFieldUIOptions
  [FieldType.RadioButton]: RadioButtonUIOptions
  [FieldType.Signature]: CommonCustomFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
  [FieldType.Textarea]: CommonCustomFieldUIOptions
}
