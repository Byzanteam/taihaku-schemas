import { DeleteAction } from '../schemas/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const deleteMovieAction: DeleteAction = {
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
  returningSchema: {
    id: { $schema: '/id' },
    title: { $schema: '/title' },
    release_date: { $schema: '/release_date' },
    created_at: { $schema: '/created_at' },
    updated_at: { $schema: '/updated_at' },
  },
}

export default deleteMovieAction
