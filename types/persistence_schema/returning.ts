import type {
  ContextPointer,
  DataPointer,
  SchemaPointer,
  ValuePointer,
} from './types.ts'

interface Returning {
  name: string
}

interface AssociationReturning extends Returning {
  type: 'association'
  value: SchemaPointer
  schema: Array<ObjectReturning>
}

interface ColumnReturning extends Returning {
  type: 'column'
  value: ContextPointer | DataPointer | SchemaPointer | ValuePointer
}

export type ObjectReturning = AssociationReturning | ColumnReturning
