import { UpdateAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const updateMovieWithCharactersAction: UpdateAction = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      release_date: { type: 'string' },
      characters: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            age: { type: 'number' },
            __delete: { type: 'boolean' },
          },
          required: ['name', 'age'],
        },
      },
    },
    required: ['id'],
  },
  filter: [
    {
      operator: 'EQ',
      operands: [{ $schema: '/id' }, { $data: '/id' }],
    },
  ],
  changeset: {
    changes: [
      {
        name: 'title',
        value: { $data: '/title' },
        schema: { type: 'string', maxLength: 255, minLength: 1 },
      },
      {
        name: 'release_date',
        value: { $data: '/release_date' },
        schema: { type: 'string', format: 'date' },
      },
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
    created_at: { $schema: '/created_at' },
    updated_at: { $schema: '/updated_at' },
  },
}

export default updateMovieWithCharactersAction
