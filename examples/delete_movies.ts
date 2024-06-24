import type { BulkDeleteAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const deleteMovieAction: BulkDeleteAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      release_date: { type: 'string', format: 'date' },
    },
  },
  filter: {
    operator: 'and',
    operands: [
      {
        operator: 'lt',
        operands: [{ $schema: '/release_date' }, { $data: '/release_date' }],
      },
      {
        operator: 'is_null',
        operands: [{ $schema: '/likes' }],
      },
    ],
  },
}

export default deleteMovieAction
