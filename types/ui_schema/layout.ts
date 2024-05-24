export type ObjectData = Record<string, unknown>

type LayoutFieldElementType = 'Field'
// Exclude is not working as expected
// https://github.com/microsoft/TypeScript/issues/47178
type LayoutElementType = Exclude<string, LayoutFieldElementType>

interface LayoutBaseElement<T extends string = string> {
  className?: string
  type: T
}

/** The container for fields */
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
