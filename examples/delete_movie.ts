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
  filter: {
    operator: 'eq',
    operands: [
      { type: 'schema', value: '/id' },
      { type: 'data', value: '/id' },
    ],
  },
  returningSchema: [
    {
      type: 'column',
      name: 'id',
      value: { type: 'schema', value: '/id' },
    },
    {
      type: 'column',
      name: 'title',
      value: { type: 'schema', value: '/title' },
    },
    {
      type: 'column',
      name: 'release_date',
      value: { type: 'schema', value: '/release_date' },
    },
    {
      type: 'column',
      name: 'created_at',
      value: { type: 'schema', value: '/created_at' },
    },
    {
      type: 'column',
      name: 'updated_at',
      value: { type: 'schema', value: '/updated_at' },
    },
  ],
}

export default deleteMovieAction
