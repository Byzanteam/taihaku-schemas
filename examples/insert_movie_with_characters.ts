import type { InsertAction } from '../types/persistence_schema/mod.ts'
import moviesSchema from './schemas/movies.ts'

const insertMovieWithCharactersAction: InsertAction = {
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
      {
        type: 'column',
        name: 'title',
        value: { type: 'data', value: '/title' },
      },
      {
        type: 'column',
        name: 'release_date',
        value: { type: 'data', value: '/release_date' },
      },
      { type: 'column', name: 'created_at', value: { $sql: 'now()' } },
      { type: 'column', name: 'updated_at', value: { $sql: 'now()' } },
      {
        type: 'association',
        name: 'characters',
        onReplace: 'delete',
        value: { type: 'data', value: '/characters' },
        changeset: {
          changes: [
            {
              type: 'column',
              name: 'name',
              value: { type: 'data', value: '0/name' },
            },
            {
              type: 'column',
              name: 'age',
              value: { type: 'data', value: '0/age' },
            },
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
                operator: 'custom',
                operands: [{ type: 'data', value: '0/age' }],
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
          operator: 'custom',
          operands: [{ type: 'data', value: '/release_date' }],
          expression: 'Date.parse(operands[0]) <= Date.now()',
          errorKey: '/release_date',
          errorMessage: 'Release date should be less than or equal to today',
        },
      ],
    },
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
      type: 'association',
      name: 'characters',
      value: { type: 'schema', value: '/characters' },
      schema: [
        {
          type: 'column',
          name: 'id',
          value: { type: 'schema', value: '/id' },
        },
        {
          type: 'column',
          name: 'name',
          value: { type: 'schema', value: '/name' },
        },
        {
          type: 'column',
          name: 'age',
          value: { type: 'schema', value: '/age' },
        },
        {
          type: 'column',
          name: 'movie_id',
          value: { type: 'schema', value: '/movie_id' },
        },
      ],
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

export default insertMovieWithCharactersAction
