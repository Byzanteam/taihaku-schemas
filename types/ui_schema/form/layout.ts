import type { ObjectData } from '../types.ts'

interface BaseElement<T extends string = string> {
  className?: string
  type: T
}

/** The custom element */
interface CustomElement<C, T extends string> extends
  // Exclude is not working as expected
  // https://github.com/microsoft/TypeScript/issues/47178
  BaseElement<Exclude<string, T>> {
  props?: ObjectData
  children?: Array<C>
}

type LayoutFieldElementType = 'Field'

/** The container for field */
interface LayoutFieldElement<O extends ObjectData>
  extends BaseElement<LayoutFieldElementType> {
  property: keyof O
}

export type ObjectLayout<
  O extends ObjectData,
  T extends string = LayoutFieldElementType,
> =
  | LayoutFieldElement<O>
  | CustomElement<ObjectLayout<O, T>, T>

/**
 * The internal elements of a field except Help
 */
type FieldTemplateElementType = 'Label' | 'Control' | 'Error' | 'Description'

/**
 * The field template for the internal elements of a field
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-templates#fieldtemplate
 */
export type FieldTemplate<T extends string = FieldTemplateElementType> =
  | BaseElement<T>
  | CustomElement<FieldTemplate<T>, T>
