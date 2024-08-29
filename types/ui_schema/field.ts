/** @enum {string} */
export enum FieldType {
  BelongsTo = 'BelongsTo',
  Boolean = 'Boolean',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  File = 'File',
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

// 文件字段属于关联字段的特例，associationResource 相对确定
// 但不排除应用自建存储表, 所以还是有 associationResource 的设置
type FileSettings = AssocitaionSettings

type SettingsRequiredFieldType =
  | FieldType.BelongsTo
  | FieldType.Checkbox
  | FieldType.File
  | FieldType.HasMany
  | FieldType.HasOne
  | FieldType.RadioButton
  | FieldType.Signature

interface FieldSettingsMap {
  [FieldType.BelongsTo]: AssocitaionSettings
  [FieldType.Checkbox]: EnumSettings
  [FieldType.File]: FileSettings
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
