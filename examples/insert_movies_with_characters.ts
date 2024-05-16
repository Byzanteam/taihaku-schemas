import { BulkInsertAction } from '../schemas/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const insertMoviesWithCharactersAction: BulkInsertAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      release_date: { type: 'string' },
      characters: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
          },
        },
      },
    },
  },
  changeset: {
    changes: [
      { name: 'title', value: { $data: '/title' } },
      { name: 'release_date', value: { $data: '/release_date' } },
      { name: 'created_at', value: { $sql: 'now()' } },
      { name: 'updated_at', value: { $sql: 'now()' } },
      {
        name: 'characters',
        onReplace: 'DELETE',
        changeset: {
          changes: [
            { name: 'name', value: { $data: '0/name' } },
            { name: 'age', value: { $data: '0/age' } },
          ],
          validator: {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'number' },
              },
              required: ['name', 'age'],
            },
            validations: [
              {
                operator: 'CUSTOM',
                operands: [{ $data: '0/age' }],
                expression: 'operands[0] >= 0',
                errorKey: '0/age',
                errorMessage: 'Age should be greater than or equal to 0',
              },
            ],
          },
        },
      },
    ],
    validator: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', maxLength: 255 },
          release_date: { type: 'string', format: 'date' },
        },
        required: ['title', 'release_date'],
      },
      validations: [
        {
          operator: 'CUSTOM',
          operands: [{ $data: '/release_date' }],
          expression: 'Date.parse(operands[0]) <= Date.now()',
          errorKey: '/release_date',
          errorMessage: 'Release date should be less than or equal to today',
        },
      ],
    },
  },
  returningSchema: {
    id: { $schema: '/id' },
    title: { $schema: '/title' },
    release_date: { $schema: '/release_date' },
    characters: {
      value: { $schema: '/characters' },
      schema: {
        id: { $schema: '0/id' },
        name: { $schema: '0/name' },
        age: { $schema: '0/age' },
        movie_id: { $schema: '/id' },
      },
    },
    created_at: { $schema: '/created_at' },
    updated_at: { $schema: '/updated_at' },
  },
}

export default insertMoviesWithCharactersAction
