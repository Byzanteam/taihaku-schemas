import type { FormUISchema } from '../mod.ts'

const RegisterFormUISchema: FormUISchema<{
  name: string
  password: string
  profile: {
    email: string
    phone: string
  }
}> = {
  'ui:submitButtonOptions': {
    submitText: '注册',
  },
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:x-field-template': [
      {
        type: 'Horizontal',
        children: [
          {
            type: 'Label',
            className: 'w-40 mr-2 text-right',
          },
          {
            type: 'Control',
            className: 'flex-1',
          },
        ],
      },
      {
        type: 'Horizontal',
        children: [
          {
            type: 'Description',
            className: 'w-40 mr-2 text-right',
          },
          {
            type: 'Error',
            className: 'flex-1',
          },
        ],
      },
    ],
  },
  password: {
    'ui:widget': 'SingleLineWidget',
  },
  profile: {
    'ui:order': ['phone', 'email'],
    email: {
      // layout without Description
      'ui:x-field-template': {
        type: 'Vertical',
        children: [
          {
            type: 'Label',
          },
          {
            type: 'Control',
          },
          {
            type: 'Error',
          },
        ],
      },
      'ui:widget': 'SingleLineWidget',
    },
    phone: {
      'ui:widget': 'SingleLineWidget',
    },
  },
}

export default RegisterFormUISchema
