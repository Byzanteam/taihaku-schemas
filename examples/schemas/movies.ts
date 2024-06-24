import type { Schema } from '../../types/persistence_schema/mod.ts'
import charactersSchema from './characters.ts'

const moviesSchema: Schema = {
  source: 'movies',
  columns: [
    { name: 'id', type: 'uuid', autoGenerate: true, primaryKey: true },
    { name: 'title', type: 'text' },
    { name: 'likes', type: 'numeric' },
    { name: 'release_date', type: 'date' },
    { name: 'created_at', type: 'timestamp' },
    { name: 'updated_at', type: 'timestamp' },
    {
      name: 'characters',
      type: 'has_many',
      foreignKey: 'movie_id',
      associationSchema: charactersSchema,
    },
  ],
}

export default moviesSchema
