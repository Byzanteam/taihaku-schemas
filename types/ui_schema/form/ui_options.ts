import type { FieldType } from '../field.ts'
import type { FieldTemplate } from './layout.ts'

export interface CommonCustomFieldUIOptions {
  'ui:x-appearance'?: 'input' | 'presentation'
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

type AssociationFieldUIOptions = {
  /** association resource identifier */
  'ui:x-association-resource': string
  /** which property should be shown as current assoication row value */
  'ui:x-display-property'?: string
  // 以下选项仅 Input 模式生效
  'ui:x-candidate-search-placeholder'?: string
  /** 备选项搜索无果的提示 */
  'ui:x-candidate-no-result-hint'?: string
  /**
   * 备选项分页尺寸
   * @default 50
   */
  'ui:x-candidate-page-size'?: number
  /**
   * content 的 className，用来指定 popover content 宽度与 trigger 宽度相同
   * 但是因为该 class 的实现只能在应用端，所以需要通过参数传递
   * @default 'popover-trigger-width'
   */
  'ui:x-candidate-popover-content-class-name'?: string
} & CommonCustomFieldUIOptions

export type CustomFieldUIOptionsMap = {
  [FieldType.BelongsTo]: AssociationFieldUIOptions
  [FieldType.Checkbox]: CheckBoxFieldUIOptions
  [FieldType.Date]: DateFieldUIOptions
  [FieldType.DateTime]: DateTimeFieldUIOptions
  [FieldType.HasMany]: AssociationFieldUIOptions
  [FieldType.HasOne]: AssociationFieldUIOptions
  [FieldType.Numeric]: NumericFieldUIOptions
  [FieldType.RadioButton]: RadioButtonFieldUIOptions
  [FieldType.Signature]: SignatureFieldUIOptions
  [FieldType.SingleLine]: SingleLineFieldUIOptions
  [FieldType.Textarea]: CommonCustomFieldUIOptions
}
