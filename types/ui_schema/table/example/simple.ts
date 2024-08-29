import type { TableSchema } from '../mod.ts'

const moviesTableSchema: TableSchema<
  {
    title: string
    releaseYear: number
    duration: string
    rating: string
    score: number
    description: string
    director?: {
      id: string // format: 'uuid'
      name: string
    }
    published: boolean
    poster?: {
      id: string // format: 'uuid'
      name: string
    }
    actors: Array<{ id: string; name: string }>
  },
  /** Custom Widget UIOption Map */
  {
    RatingWidget: {
      'ui:x-count'?: number
    }
  }
> = {
  columns: {
    published: {
      fieldType: 'BooleanField',
      name: 'published',
      label: '是否上映',
    },
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
    description: {
      name: 'description',
      fieldType: 'TextareaField',
      label: '介绍',
    },
    director: {
      name: 'director',
      fieldType: 'BelongsToField',
      label: '导演',
      settings: {
        associationResource: 'director',
      },
    },
    poster: {
      name: 'poster',
      fieldType: 'FileField',
      label: '海报',
      settings: {
        accept: 'image/*',
        maxCount: 1,
        maxFileItemSize: 20 * 1024 * 1024,
      },
    },
    actors: {
      name: 'actors',
      fieldType: 'HasManyField',
      label: '演员',
      settings: {
        associationResource: 'star',
      },
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
    published: {
      'ui:widget': 'BooleanWidget',
      'ui:x-falsy-label': '未上映',
      'ui:x-truthy-label': '已上映',
    },
    title: {
      'ui:widget': 'SingleLineWidget',
      'ui:size': 400,
    },
    rating: {
      'ui:widget': 'RadioButtonWidget',
      'ui:max-size': 100,
      'ui:x-option-fallback-style': 'text-gray-500 bg-gray-200 border-gray-500',
      'ui:x-options-style': {
        Approved: 'text-green-500 bg-green-200 border-green-500',
        PG: 'text-orange-500 bg-orange-200 border-orange-500',
        R: 'text-red-500 bg-red-200 border-red-500',
      },
    },
    director: {
      'ui:widget': 'BelongsToWidget',
      'ui:x-display-property': 'name',
    },
    poster: {
      'ui:widget': 'FileWidget',
    },
    actors: {
      'ui:widget': 'HasManyWidget',
      'ui:x-display-property': 'name',
    },
    score: {
      'ui:widget': 'RatingWidget',
      'ui:x-count': 5,
    },
  },
}

export default moviesTableSchema
