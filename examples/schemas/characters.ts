import type { Schema } from '../../types/persistence_schema/mod.ts'
import moviesSchema from './movies.ts'

const charactersSchema: Schema = {
  source: 'characters',
  columns: [
    { name: 'id', type: 'uuid', autoGenerate: true, primaryKey: true },
    { name: 'name', type: 'text' },
    { name: 'age', type: 'numeric' },
    {
      name: 'movie',
      type: 'belongs_to',
      foreignKey: 'movie_id',
      associationSchema: moviesSchema,
    },
  ],
}

export default charactersSchema
