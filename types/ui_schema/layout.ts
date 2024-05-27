export type ObjectData = Record<string, unknown>

type LayoutFieldElementType = 'Field'
// Exclude is not working as expected
// https://github.com/microsoft/TypeScript/issues/47178
type LayoutElementType = Exclude<string, LayoutFieldElementType>

/**
 * The internal elements of a field except Help
 * @link https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-templates#fieldtemplate
 */
type LayoutFieldElementsType = 'Label' | 'Control' | 'Error' | 'Description'

interface LayoutBaseElement<T extends string = string> {
  className?: string
  type: T
}

/** The container for field */
interface LayoutFieldElement<O extends ObjectData>
  extends LayoutBaseElement<LayoutFieldElementType> {
  property: keyof O
}

/** The custom element */
interface LayoutCustomElement<O extends ObjectData>
  extends LayoutBaseElement<LayoutElementType> {
  props?: ObjectData
  children?: Array<LayoutElement<O>>
}

export type LayoutElement<O extends ObjectData> =
  | LayoutFieldElement<O>
  | LayoutCustomElement<O>

/** The layout element for the internal elements of a field */
export type FieldElementLayoutElement =
  | LayoutBaseElement<LayoutFieldElementsType>
  | LayoutCustomElement<
    {
      [K in LayoutFieldElementsType]: unknown
    }
  >
