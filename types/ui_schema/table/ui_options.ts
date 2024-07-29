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

export type CustomColumnUIOptionsMap = {
  // TODO: define Checkbox to Signature's UIOptions
  [FieldType.Checkbox]: CommonCustomFieldUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.Numeric]: CommonCustomFieldUIOptions
  [FieldType.RadioButton]: CommonCustomFieldUIOptions
  [FieldType.Signature]: CommonCustomFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
  [FieldType.Textarea]: CommonCustomFieldUIOptions
}
