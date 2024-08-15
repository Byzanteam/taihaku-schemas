import {
  ConditionalFilterOperator,
  LogicalFilterOperator,
} from '../types/mod.ts'
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
    operator: ConditionalFilterOperator.AND,
    operands: [
      {
        operator: LogicalFilterOperator.LT,
        operands: [
          { type: 'schema', value: '/release_date' },
          { type: 'data', value: '/release_date' },
        ],
      },
      {
        operator: LogicalFilterOperator.IS_NULL,
        operands: [{ type: 'schema', value: '/likes' }],
      },
    ],
  },
}

export default deleteMovieAction
