import { UISchema, FormOptions } from '../mod.ts'

const PersonFormUISchema: UISchema = {
  // props pass to form
  'ui:options': {
    submitButtonOptions: {
      norender: true,
    },
  } as Partial<FormOptions>,
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '请输入',
  },
  gender: {
    'ui:widget': 'RadioButtonWidget',
    'ui:options': {
      columns: 2,
    },
  },
  birthday: {
    'ui:widget': 'date',
    'ui:options': {
      format: 'yyyy年MM月dd日',
    },
    'ui:placeholder': '请选择',
  },
  profession: {
    'ui:widget': 'RadioButtonWidget',
    'ui:options': {
      display: 'select',
    },
    'ui:placeholder': '请选择',
  },
  sports: {
    'ui:widget': 'CheckboxWidget',
    'ui:options': {
      columns: 3,
    },
  },
  signature: {
    'ui:widget': 'SignatureWidget',
    'ui:options': {
      penColor: 'red',
    },
  },
}

export default PersonFormUISchema
