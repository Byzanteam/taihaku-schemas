import type { FormUISchema } from '../mod.ts'

const MovieFormUISchema: FormUISchema<
  {
    name: string
    director?: {
      id: string // format: 'uuid'
      name?: string
    }
    poster?: {
      id?: string // format: 'uuid'
      name: string
    }
    actors: Array<{ id: string; name: string }>
  },
  /** Custom Widget UIOption Map */
  {
    FileWidget: {
      'ui:x-multiple': boolean
      'ui:x-accept': string
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
    'ui:x-multiple': false,
    'ui:x-accept': 'image/*',
  },
  actors: {
    'ui:widget': 'HasManyWidget',
    'ui:x-association-resource': 'star',
    'ui:x-display-property': 'name',
  },
}

export default MovieFormUISchema
