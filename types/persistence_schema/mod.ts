import type { JSONSchema } from '../primitive.ts'
import type { Change, Changeset, ColumnChange } from './changeset.ts'
import type {
  FormatedJSONSchemaError,
  FormatedValidationError,
  InternalError,
  JSONSchemaError,
  ValidationError,
} from './error.ts'
import type { Fetching } from './fetching.ts'
import type { Filter } from './filter.ts'
import type { OffsetPagination } from './pagination.ts'
import type { ObjectReturning } from './returning.ts'
import type { Order, Sorters } from './sorting.ts'
import type { ColumnType } from './types.ts'

export interface ColumnDef {
  name: string
  type: ColumnType
  autoGenerate?: boolean
  primaryKey?: boolean
}

export interface AssociationDef {
  name: string
  type: 'has_one' | 'has_many'
  foreignKey: string
  associationSchema: Schema
}

export interface Schema {
  source: string
  columns: Array<ColumnDef | AssociationDef>
}

export interface InsertAction {
  schema: Schema
  paramsSchema: JSONSchema
  changeset: Changeset<Change>
  returningSchema: Array<ObjectReturning>
}

export interface UpdateAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  changeset: Changeset<Change>
  returningSchema: Array<ObjectReturning>
}

export interface DeleteAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  returningSchema: Array<ObjectReturning>
}

export interface GetOneAction {
  schema: Schema
  paramsSchema: JSONSchema
  filter: Filter
  fetchingSchema: Array<Fetching>
  returningSchema: Array<ObjectReturning>
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
  sorting?: Sorters
  pagination: OffsetPagination
  fetchingSchema: Array<Fetching>
  returningSchema: Array<ObjectReturning>
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
  returningSchema: Array<ObjectReturning>
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
export type { Filter, Order, Sorters }
export type { ConditionalFilter, LogicalFilter } from './filter.ts'
export * from './types.ts'
