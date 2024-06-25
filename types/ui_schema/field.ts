/** @enum {string} */
export enum FieldType {
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  Numeric = 'Numeric',
  RadioButton = 'RadioButton',
  Signature = 'Signature',
  SingleLine = 'SingleLine',
}

interface BasicField<T extends FieldType> {
  name: string
  label: string
  fieldType: `${T}Field`
}

interface EnumSettings {
  options: Array<{
    label: string
    value: string
  }>
}

export interface CheckboxField extends BasicField<FieldType.Checkbox> {
  settings: EnumSettings
}
export type DateField = BasicField<FieldType.Date>
export type DateTimeField = BasicField<FieldType.DateTime>
export type NumericField = BasicField<FieldType.Numeric>
export interface RadioButtonField extends BasicField<FieldType.RadioButton> {
  settings: EnumSettings
}
export interface SignatureField extends BasicField<FieldType.Signature> {
  settings: {
    contentMediaType?: string
  }
}
export type SingleLineField = BasicField<FieldType.SingleLine>

export type Field =
  | CheckboxField
  | DateField
  | DateTimeField
  | NumericField
  | RadioButtonField
  | SignatureField
  | SingleLineField

export type FieldSettings =
  | CheckboxField['settings']
  | SignatureField['settings']
