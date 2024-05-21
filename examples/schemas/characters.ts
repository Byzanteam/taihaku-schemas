import type { Schema } from '../../types/persistence_schema/mod.ts'

const charactersSchema: Schema = {
  columns: [
    { name: 'id', type: 'uuid', autoGenerate: true, primaryKey: true },
    { name: 'name', type: 'text' },
    { name: 'age', type: 'numeric' },
    { name: 'movie_id', type: 'uuid' },
  ],
}

export default charactersSchema
