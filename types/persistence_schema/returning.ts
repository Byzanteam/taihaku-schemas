import {
  $ContextPointer,
  $DataPointer,
  $SchemaPointer,
  $ValuePointer,
} from './types.ts'

export interface ObjectReturnings {
  [objectName: string]:
    | $DataPointer
    | $ValuePointer
    | $ContextPointer
    | $SchemaPointer
    | { value: $SchemaPointer; schema: ObjectReturnings }
}
