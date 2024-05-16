import { BulkUpdateAction } from '../schemas/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const updateMoviesAction: BulkUpdateAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
  },
  filter: [
    {
      operator: 'IS_NULL',
      operands: [{ $schema: '/release_date' }],
    },
  ],
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
  returningSchema: {
    id: { $schema: '/id' },
    title: { $schema: '/title' },
    release_date: { $schema: '/release_date' },
    created_at: { $schema: '/created_at' },
    updated_at: { $schema: '/updated_at' },
  },
}

export default updateMoviesAction
