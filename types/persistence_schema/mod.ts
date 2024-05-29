import type { JSONSchema } from '../primitive.ts'
import type { Change, Changeset, ColumnChange } from './changeset.ts'
import type {
  FormatedJSONSchemaError,
  FormatedValidationError,
  InternalError,
  JSONSchemaError,
  ValidationError,
} from './error.ts'
import type { Filter } from './filter.ts'
import type { OffsetPagination } from './pagination.ts'
import type { ObjectReturnings } from './returning.ts'
import type { Order } from './sorting.ts'
import type { ColumnType } from './types.ts'

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
  paramsSchema: JSONSchema
  changeset: Changeset<Change>
  returningSchema: ObjectReturnings
}

export interface UpdateAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  changeset: Changeset<Change>
  returningSchema: ObjectReturnings
}

export interface DeleteAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  returningSchema: ObjectReturnings
}

export interface GetOneAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  returningSchema: ObjectReturnings
}

export interface BulkInsertAction {
  schema: Schema
  paramsSchema: JSONSchema
  changeset: Changeset<ColumnChange>
}

export interface BulkUpdateAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  changeset: Changeset<ColumnChange>
}

export interface BulkDeleteAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
}

export interface ListAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
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

export interface NextjsResult {
  errors:
    | Array<InternalError>
    | Array<FormatedJSONSchemaError | FormatedValidationError>
}

export type { InternalError, JSONSchemaError, ValidationError }
export type { FormatedJSONSchemaError, FormatedValidationError }
