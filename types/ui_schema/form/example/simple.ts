import type { UISchema } from '../mod.ts'

const PersonFormUISchema: UISchema<{
  name: string
  gender: string
  birthday: string
  profession: string
  sports: Array<string>
  signature: string
  idNumber: string
  profile: {
    nickname: string
  }
  tags: Array<{
    title: string
  }>
  maxim: string
}> = {
  'ui:rootFieldId': 'PersonForm',
  'ui:submitButtonOptions': {
    norender: true,
  },
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '请输入',
  },
  gender: {
    'ui:widget': 'RadioButtonWidget',
    'ui:x-columns': 2,
  },
  idNumber: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '请输入',
  },
  birthday: {
    'ui:widget': 'DateWidget',
    'ui:x-format': 'yyyy年MM月dd日',
    'ui:placeholder': '请选择',
    'ui:readonly': true,
  },
  profession: {
    'ui:widget': 'RadioButtonWidget',
    'ui:x-display': 'select',
    'ui:placeholder': '请选择',
  },
  sports: {
    'ui:widget': 'CheckboxWidget',
    'ui:x-columns': 2,
  },
  signature: {
    'ui:widget': 'SignatureWidget',
    'ui:x-penColor': 'red',
  },
  profile: {
    nickname: {
      'ui:widget': 'SingleLineWidget',
      'ui:placeholder': '请输入',
    },
  },
  tags: {
    items: {
      title: {
        'ui:widget': 'SingleLineWidget',
        'ui:placeholder': '请输入',
      },
    },
  },
  maxim: {
    'ui:widget': 'TextareaWidget',
    'ui:placeholder': '请输入',
  },
}

export default PersonFormUISchema
