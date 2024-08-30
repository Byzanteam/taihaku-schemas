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

interface FileSettings {
  /**
   * Defines the max size of a file upload in megabytes (MB) (inclusive)
   * that can be selected for uploading
   * @default Infinity
   */
  maxFileItemSizeLimitInMB?: number
  /**
   * Count limit
   * @default Infinity
   */
  maxCount?: number
  /**
   * Allowed mimetype pattern
   * @default '*'
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept?: string
}

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
