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
        operator: 'eq',
        operands: [{ $schema: '/created_at' }, { $schema: '/updated_at' }],
      },
      {
        operator: 'or',
        operands: [
          {
            operator: 'is_null',
            operands: [{ $schema: '/likes' }],
          },
          {
            operator: 'is_null',
            operands: [{ $schema: '/release_date' }],
          },
        ],
      },
    ],
  },
  changeset: {
    changes: [
      // SET
      {
        name: 'title',
        value: { $data: '/title' },
        schema: { type: 'string', maxLength: 255, minLength: 1 },
      },
      // INC
      {
        name: 'likes',
        value: {
          $sql: '? + 1',
        },
      },
      { name: 'updated_at', value: { $sql: 'now()' } },
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
