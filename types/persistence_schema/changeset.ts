import { JSONSchema7 } from '../primitive.ts'
import {
  $ContextPointer,
  $DataPointer,
  $ValuePointer,
  AssociationName,
  ColumnName,
} from './types.ts'
import { Validation } from './validation.ts'

export interface ColumnChange {
  name: ColumnName
  /**
   * the new value of the column
   */
  value:
    | $DataPointer
    | $ValuePointer
    | $ContextPointer
    | {
      $sql:
        | string
        | {
          expression: string
          arguments: Array<$DataPointer | $ValuePointer>
        }
    }
  /**
   * the corresponding validator for the value
   */
  schema?: JSONSchema7
}

export interface AssociationChange {
  name: AssociationName
  changeset: Changeset<Change>
  // TODO: onDelete 和 onReplace 应该在 changeset 还是 schema 的定义中
  onReplace:
    | 'MARK_AS_INVALID'
    | 'NILIFY'
    | 'UPDATE'
    | 'DELETE'
    | 'DELETE_IF_EXISTS'
  /**
   * the corresponding validator for the association values
   */
  schema?: JSONSchema7
}

export type Change = ColumnChange | AssociationChange

export interface Validator {
  schema?: JSONSchema7
  validations?: Array<Validation>
}

export interface Changeset<C> {
  changes: Array<C>
  /**
   * the corresponding validator for the changes
   */
  validator?: Validator
}
