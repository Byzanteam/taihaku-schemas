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

interface EnumSettings {
  options: Array<{
    label: string
    value: string
  }>
}

type SettingsRequiredFieldType =
  | FieldType.Checkbox
  | FieldType.RadioButton
  | FieldType.Signature

interface FieldSettingsMap {
  [FieldType.Checkbox]: EnumSettings
  [FieldType.RadioButton]: EnumSettings
  [FieldType.Signature]: {
    contentMediaType?: string
  }
}

export type GenericField<
  N,
  T extends FieldType = FieldType.SingleLine,
> = T extends SettingsRequiredFieldType ? {
    name: N
    label: string
    fieldType: `${T}Field`
    settings: FieldSettingsMap[T]
  }
  : {
    name: N
    label: string
    fieldType: `${T}Field`
  }

export type Field = GenericField<string, FieldType>
