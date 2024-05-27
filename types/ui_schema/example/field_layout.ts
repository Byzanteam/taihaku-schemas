import type { UISchema } from '../../mod.ts'

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
}

export default LoginFormUISchema
