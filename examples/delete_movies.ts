import { BulkDeleteAction } from '../schemas/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const deleteMovieAction: BulkDeleteAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      release_date: { type: 'string', format: 'date' },
    },
  },
  filter: [
    {
      operator: 'LT',
      operands: [{ $schema: '/release_date' }, { $data: '/release_date' }],
    },
  ],
}

export default deleteMovieAction
