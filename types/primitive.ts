export type { JSONSchema7 } from 'npm:@types/json-schema@7'

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