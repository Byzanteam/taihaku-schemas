import type { DeleteAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const deleteMovieAction: DeleteAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  filter: [
    {
      operator: 'EQ',
      operands: [{ $schema: '/id' }, { $data: '/id' }],
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
