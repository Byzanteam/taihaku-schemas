import { UISchema } from '../mod.ts'

const PersonFormUISchema: UISchema<
  {
    name: string
    gender: string
    birthday: string
    profession: string
    sports: Array<string>
    signature: string
  },
  {
    md: 1200
  }
> = {
  // props pass to form
  'ui:options': {
    submitButtonOptions: {
      norender: true,
    },
    layout: {
      gap: [3, 6],
      columns: 12,
      screens: {
        md: 1200,
      },
      groups: [
        {
          title: 'group A',
          rows: {
            /**
             * ---------------------------------------------------
             * | name                   | gender                 |
             * |-------------------------------------------------|
             * | birthday               |                        |
             * |------------------------| signature              |
             * | professsion| sports    |                        |
             * ---------------------------------------------------
             */
            default: [
              [
                {
                  span: 6,
                  field: 'name',
                },
                {
                  span: 6,
                  field: 'gender',
                },
              ],
              [
                {
                  span: 6,
                  field: 'birthday',
                },
                {
                  span: 6,
                  field: 'signature',
                  rowSpan: 2,
                },
              ],
              [
                {
                  span: 3,
                  field: 'profession',
                },
                {
                  span: 'fill',
                  field: 'sports',
                },
              ],
            ],
            md: [],
          },
        },
      ],
    },
  },
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
