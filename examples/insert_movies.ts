import type { BulkInsertAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const insertMoviesAction: BulkInsertAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      release_date: { type: 'string' },
    },
  },
  changeset: {
    changes: [
      {
        name: 'title',
        value: { $data: '/title' },
        schema: { type: 'string', maxLength: 255, minLength: 1 },
      },
      {
        name: 'release_date',
        value: { $data: '/release_date' },
        schema: { type: 'string', format: 'date' },
      },
      { name: 'created_at', value: { $sql: 'now()' } },
      { name: 'updated_at', value: { $sql: 'now()' } },
    ],
    validator: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', maxLength: 255 },
          release_date: { type: 'string', format: 'date' },
        },
        required: ['title', 'release_date'],
      },
      validations: [
        {
          operator: 'custom',
          operands: [{ $data: '/release_date' }],
          expression: 'Date.parse(operands[0]) <= Date.now()',
          errorKey: '/release_date',
          errorMessage: 'Release date should be less than or equal to today',
        },
      ],
    },
  },
}

export default insertMoviesAction
