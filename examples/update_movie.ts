import type { UpdateAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const updateMovieAction: UpdateAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      release_date: { type: 'string' },
    },
    required: ['id'],
  },
  filter: {
    operator: 'eq',
    operands: [{ $schema: '/id' }, { $data: '/id' }],
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
      { name: 'updated_at', value: { $sql: 'now()' } },
    ],
    validator: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', maxLength: 255 },
          release_date: { type: 'string', format: 'date' },
        },
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
  returningSchema: {
    id: { $schema: '/id' },
    title: { $schema: '/title' },
    release_date: { $schema: '/release_date' },
    created_at: { $schema: '/created_at' },
    updated_at: { $schema: '/updated_at' },
  },
}

export default updateMovieAction
