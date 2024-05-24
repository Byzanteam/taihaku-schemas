import { UISchema } from '../../mod.ts'

const LoginFormUISchema: UISchema<{
  name: string
  password: string
}> = {
  'ui:submitButtonOptions': {
    submitText: '登录',
  },
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:x-field-layout': [
      {
        type: 'Horizontal',
        children: [
          {
            type: 'Field',
            className: 'w-40 mr-2 text-right',
            property: 'label',
          },
          {
            type: 'Field',
            className: 'flex-1',
            property: 'control',
          },
        ],
      },
      {
        type: 'Horizontal',
        children: [
          {
            type: 'Field',
            className: 'w-40 mr-2 text-right',
            property: 'description',
          },
          {
            type: 'Field',
            className: 'flex-1',
            property: 'error',
          },
        ],
      },
    ],
  },
}

export default LoginFormUISchema
