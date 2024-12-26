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
    operator: 'and',
    operands: [
      {
        operator: 'ref_eq',
        operands: [
          { type: 'schema', value: '/created_at' },
          { type: 'schema', value: '/updated_at' },
        ],
      },
      {
        operator: 'or',
        operands: [
          {
            operator: 'is_null',
            operands: [{ type: 'schema', value: '/likes' }],
          },
          {
            operator: 'is_null',
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
