import { JSONSchema7 } from '../types.ts'
import { Changeset } from './changeset.ts'
import { JSONSchemaError, ValidationError, InternalError } from "./error.ts"
import { Filter } from './filter.ts'
import { ObjectReturnings } from './returning.ts'
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
  changeset: Changeset
  returningSchema: ObjectReturnings
}

// TODO: 前端如何获取初始值
export interface UpdateAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset
  returningSchema: ObjectReturnings
  filter: Array<Filter>
}

export interface DeleteAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

// TODO: 通过 GetOneACtion 获取初始值
export interface GetOneAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

export interface BulkInsertAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset
}

export interface BulkUpdateAction {
  schema: Schema
  paramsSchema: JSONSchema7
  changeset: Changeset
  filter: Array<Filter>
}

export interface BulkDeleteAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

export interface ListAction {
  schema: Schema
  paramsSchema: JSONSchema7
  filter: Array<Filter>
  returningSchema: ObjectReturnings
}

// TODO: to be implemented
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
