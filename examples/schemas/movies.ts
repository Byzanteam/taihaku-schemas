import { Schema } from '../../types/persistence_schema/mod.ts'
import charactersSchema from './characters.ts'

const moviesSchema: Schema = {
  columns: [
    { name: 'id', type: 'uuid', autoGenerate: true, primaryKey: true },
    { name: 'title', type: 'text' },
    { name: 'likes', type: 'numeric' },
    { name: 'release_date', type: 'date' },
    { name: 'created_at', type: 'timestamp without time zone' },
    { name: 'updated_at', type: 'timestamp without time zone' },
    {
      name: 'characters',
      type: 'HAS_MANY',
      foreignKey: 'movie_id',
      associationSchema: charactersSchema,
    },
  ],
}

export default moviesSchema
