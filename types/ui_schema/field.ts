/** @enum {string} */
export enum FieldType {
  BelongsTo = 'BelongsTo',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  HasMany = 'HasMany',
  HasOne = 'HasOne',
  Numeric = 'Numeric',
  RadioButton = 'RadioButton',
  Signature = 'Signature',
  SingleLine = 'SingleLine',
  Textarea = 'Textarea',
}

interface EnumSettings {
  options: Array<{
    label: string
    value: string
  }>
}

interface AssocitaionSettings {
  /** association resource identifier */
  associationResource: string
}

type SettingsRequiredFieldType =
  | FieldType.BelongsTo
  | FieldType.Checkbox
  | FieldType.HasMany
  | FieldType.HasOne
  | FieldType.RadioButton
  | FieldType.Signature

interface FieldSettingsMap {
  [FieldType.BelongsTo]: AssocitaionSettings
  [FieldType.Checkbox]: EnumSettings
  [FieldType.HasMany]: AssocitaionSettings
  [FieldType.HasOne]: AssocitaionSettings
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
