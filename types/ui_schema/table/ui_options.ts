import type { FieldType } from '../field.ts'

export type TableAppearance = 'input' | 'presentation'

interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: TableAppearance
  'ui:x-blankslate'?: string
}

type SingleLineFieldUIOptions = CommonCustomFieldUIOptions

type DateTimeFieldUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-format'?: string
}

type DateFieldUIOptions = DateTimeFieldUIOptions

type RadioButtonUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-option-fallback-style'?: /** className */ string
  'ui:x-options-style'?: Record<
    /** option-value */ string,
    /** className */ string
  >
}

type CheckboxUIOptions = RadioButtonUIOptions

type AssociationUIOptions = CommonCustomFieldUIOptions & {
  /** which property should be shown as current assoication row value */
  'ui:x-display-property': string
}

type FileUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-capture'?: 'user' | 'environment'
}

type BooleanUIOptions = CommonCustomFieldUIOptions & {
  'ui:x-truthy-label'?: string
  'ui:x-falsy-label'?: string
}

export type CustomColumnUIOptionsMap = {
  [FieldType.BelongsTo]: AssociationUIOptions
  [FieldType.Boolean]: BooleanUIOptions
  [FieldType.Checkbox]: CheckboxUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.File]: FileUIOptions
  [FieldType.HasMany]: AssociationUIOptions
  [FieldType.HasOne]: AssociationUIOptions
  [FieldType.Numeric]: CommonCustomFieldUIOptions
  [FieldType.RadioButton]: RadioButtonUIOptions
  [FieldType.Signature]: CommonCustomFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
  [FieldType.Textarea]: CommonCustomFieldUIOptions
}
