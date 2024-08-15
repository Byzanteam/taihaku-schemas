import {
  ConditionalFilterOperator,
  LogicalFilterOperator,
} from '../types/mod.ts'
import type { BulkUpdateAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const updateMoviesAction: BulkUpdateAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
  },
  filter: {
    operator: ConditionalFilterOperator.AND,
    operands: [
      {
        operator: LogicalFilterOperator.EQ,
        operands: [
          { type: 'schema', value: '/created_at' },
          { type: 'schema', value: '/updated_at' },
        ],
      },
      {
        operator: ConditionalFilterOperator.OR,
        operands: [
          {
            operator: LogicalFilterOperator.IS_NULL,
            operands: [{ type: 'schema', value: '/likes' }],
          },
          {
            operator: LogicalFilterOperator.IS_NULL,
            operands: [{ type: 'schema', value: '/release_date' }],
          },
        ],
      },
    ],
  },
  changeset: {
    changes: [
      // SET
      {
        type: 'column',
        name: 'title',
        value: { type: 'data', value: '/title' },
        schema: { type: 'string', maxLength: 255, minLength: 1 },
      },
      // INC
      {
        type: 'column',
        name: 'likes',
        value: {
          $sql: '? + 1',
        },
      },
      { type: 'column', name: 'updated_at', value: { $sql: 'now()' } },
    ],
    validator: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', maxLength: 255 },
        },
      },
    },
  },
}

export default updateMoviesAction
