import type { FormUISchema } from '../mod.ts'

const MovieFormUISchema: FormUISchema<
  {
    name: string
    director?: {
      id: string // format: 'uuid'
      name?: string
    }
    score: number
    poster?: {
      id?: string // format: 'uuid'
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
  'ui:rootFieldId': 'CreateMovieForm',
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '请输入',
  },
  director: {
    'ui:widget': 'BelongsToWidget',
    'ui:x-association-resource': 'director',
    'ui:x-display-property': 'name',
  },
  poster: {
    'ui:widget': 'FileWidget',
    'ui:x-max-file-item-size': 20 * 1024 * 1024,
    'ui:x-capture': 'user',
    'ui:x-accept': 'image/*',
    'ui:x-max-count': 1,
  },
  score: {
    'ui:widget': 'RatingWidget',
    'ui:x-count': 5,
  },
  actors: {
    'ui:widget': 'HasManyWidget',
    'ui:x-association-resource': 'star',
    'ui:x-display-property': 'name',
  },
}

export default MovieFormUISchema
