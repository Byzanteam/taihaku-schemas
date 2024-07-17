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
        type: 'column',
        name: 'title',
        value: { type: 'data', value: '/title' },
        schema: { type: 'string', maxLength: 255, minLength: 1 },
      },
      {
        type: 'column',
        name: 'release_date',
        value: { type: 'data', value: '/release_date' },
        schema: { type: 'string', format: 'date' },
      },
      { type: 'column', name: 'created_at', value: { $sql: 'now()' } },
      { type: 'column', name: 'updated_at', value: { $sql: 'now()' } },
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
          operands: [{ type: 'data', value: '/release_date' }],
          expression: 'Date.parse(operands[0]) <= Date.now()',
          errorKey: '/release_date',
          errorMessage: 'Release date should be less than or equal to today',
        },
      ],
    },
  },
}

export default insertMoviesAction
