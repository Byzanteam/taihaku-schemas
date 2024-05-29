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
    operator: 'AND',
    operands: [
      {
        operator: 'LT',
        operands: [{ $schema: '/release_date' }, { $data: '/release_date' }],
      },
      {
        operator: 'IS_NULL',
        operands: [{ $schema: '/likes' }],
      },
    ],
  },
}

export default deleteMovieAction
