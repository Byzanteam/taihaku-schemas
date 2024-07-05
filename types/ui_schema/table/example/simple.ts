import type { TableSchema } from '../mod.ts'

const moviesTableSchema: TableSchema<{
  title: string
  releaseYear: number
  duration: string
  rating: string
  score: number
}> = {
  id: 'movie_list_schema',
  columns: {
    releaseYear: {
      fieldType: 'NumericField',
      name: 'releaseYear',
      label: '上映时间',
    },
    title: {
      fieldType: 'SingleLineField',
      name: 'title',
      label: '电影名称',
    },
    duration: {
      fieldType: 'SingleLineField',
      name: 'duration',
      label: '时长',
    },
    rating: {
      fieldType: 'RadioButtonField',
      name: 'rating',
      label: '评级',
      settings: {
        options: [
          {
            label: 'R',
            value: 'R',
          },
          {
            label: 'PG-13',
            value: 'PG-13',
          },
          {
            label: 'Approved',
            value: 'Approved',
          },
          {
            label: 'PG',
            value: 'PG',
          },
        ],
      },
    },
    score: {
      fieldType: 'NumericField',
      name: 'score',
      label: '评分',
    },
  },
  uiSchema: {
    'ui:column-order': ['title', 'rating', 'score', 'duration', 'releaseYear'],
    'ui:column-pinning': {
      left: ['title'],
    },
    'ui:column-visibility': {
      title: true,
      rating: false,
      releaseYear: true,
    },
    title: {
      'ui:widget': 'SingleLineWidget',
      'ui:size': 400,
    },
    rating: {
      'ui:widget': 'RadioButtonWidget',
      'ui:max-size': 100,
    },
  },
}

export default moviesTableSchema
