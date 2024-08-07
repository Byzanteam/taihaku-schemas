import type { JSONSchema } from '../primitive.ts'
import type {
  AssociationName,
  ColumnName,
  ContextPointer,
  DataPointer,
  ValuePointer,
} from './types.ts'
import type { Validation } from './validation.ts'

export interface ColumnChange {
  type: 'column'
  name: ColumnName
  /**
   * the new value of the column
   */
  value:
    | ContextPointer
    | DataPointer
    | ValuePointer
    | {
      $sql:
        | string
        | {
          expression: string
          arguments: Array<DataPointer | ValuePointer>
        }
    }
  /**
   * the corresponding validator for the value
   */
  schema?: JSONSchema
}

export interface AssociationChange {
  type: 'association'
  name: AssociationName
  value: DataPointer | ValuePointer
  changeset: Changeset<Change>
  // TODO: onDelete 和 onReplace 应该在 changeset 还是 schema 的定义中
  onReplace:
    | 'mark_as_invalid'
    | 'nilify'
    | 'update'
    | 'delete'
    | 'delete_if_exists'
  /**
   * the corresponding validator for the association values
   */
  schema?: JSONSchema
}

export type Change = ColumnChange | AssociationChange

export interface Validator {
  schema?: JSONSchema
  validations?: Array<Validation>
}

export interface Changeset<C> {
  changes: Array<C>
  /**
   * the corresponding validator for the changes
   */
  validator?: Validator
}
