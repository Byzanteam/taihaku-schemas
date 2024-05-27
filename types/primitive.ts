import type { JSONSchema7 } from 'npm:@types/json-schema@7'

export type JSONPointer = AbsoluteJSONPointer | RelativeJSONPointer
/**
 * see https://datatracker.ietf.org/doc/html/rfc6901
 */
export type AbsoluteJSONPointer = string
/**
 * see https://datatracker.ietf.org/doc/html/draft-bhutton-relative-json-pointer-00
 */
export type RelativeJSONPointer = string

export type JSONValue = string | number | boolean | string[] | object

// this type is same with https://github.com/rjsf-team/react-jsonschema-form/blob/main/packages/utils/src/types.ts#L14C1-L28C63
/** The representation of any generic object type, usually used as an intersection on other types to make them more
 * flexible in the properties they support (i.e. anything else)
 */
export type GenericObjectType = {
  [name: string]: any
}
/** Map the JSONSchema to our own type so that we can easily bump to a more recent version at some future date and only
 * have to update this one type.
 */
export type StrictJSONSchema = JSONSchema7
/** Allow for more flexible schemas (i.e. draft-2019) than the strict JSONSchema
 */
export type JSONSchema = StrictJSONSchema & GenericObjectType
