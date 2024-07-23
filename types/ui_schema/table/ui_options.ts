import type { FieldType } from '../field.ts'

interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: 'input' | 'presentation'
  'ui:x-blankslate'?: string
}

type SingleLineFieldUIOptions = CommonCustomFieldUIOptions

export type CustomColumnUIOptionsMap = {
  // TODO: define Checkbox to Signature's UIOptions
  [FieldType.Checkbox]: CommonCustomFieldUIOptions
  [FieldType.Date]: CommonCustomFieldUIOptions
  [FieldType.DateTime]: CommonCustomFieldUIOptions
  [FieldType.Numeric]: CommonCustomFieldUIOptions
  [FieldType.RadioButton]: CommonCustomFieldUIOptions
  [FieldType.Signature]: CommonCustomFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
  [FieldType.Textarea]: CommonCustomFieldUIOptions
}
