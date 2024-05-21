import { JSONSchema7 } from '../primitive.ts'
import { Change, Changeset, ColumnChange } from './changeset.ts'
import { InternalError, JSONSchemaError, ValidationError } from './error.ts'
import { Filter } from './filter.ts'
import { OffsetPagination } from './pagination.ts'
import { ObjectReturnings } from './returning.ts'
import { Order } from './sorting.ts'
import { ColumnType } from './types.ts'

export interface ColumnDef {
  name: string
  type: ColumnType
  autoGenerate?: boolean
  primaryKey?: boolean
}

export interface AssociationDef {
  name: string
  type: 'HAS_ONE' | 'HAS_MANY'
  foreignKey: string
  associationSchema: Schema
}

export interface Schema {
  columns: Array<ColumnDef | AssociationDef>
}

export interface InsertAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset<Change>
  returningSchema: ObjectReturnings
}

export interface UpdateAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset<Change>
  returningSchema: ObjectReturnings
  filter: Array<Filter>
}

export interface DeleteAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

export interface GetOneAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

export interface BulkInsertAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset<ColumnChange>
}

export interface BulkUpdateAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset<ColumnChange>
  filter: Array<Filter>
}

export interface BulkDeleteAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
}

export interface ListAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  sorting?: Array<Order>
  pagination: OffsetPagination
  returningSchema: ObjectReturnings
}

export interface MultiAction {
  actions: Array<{
    name: string
    action:
      | InsertAction
      | UpdateAction
      | DeleteAction
      | GetOneAction
  }>
  returningSchema: ObjectReturnings
}

export interface Result {
  errors: Array<InternalError> | Array<JSONSchemaError | ValidationError>
}
