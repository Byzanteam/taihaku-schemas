import type { UISchema } from '../mod.ts'

const LayoutedFormUISchema: UISchema<{
  name: string
  signature: string
  birthday: string
  gender: string
  address: string
  profile: {
    nickname: string
    email: string
  }
  tags: Array<{ title: string; color: string }>
}> = {
  /**
   * Outer layout
   * ----------------------------------------
   * | name       | profile    | signature  |
   * |-------------------------|            |
   * | birthday   | gender     |            |
   * |--------------------------------------|
   * | address           | tags             |
   * ----------------------------------------
   */
  'ui:x-layout': [
    {
      type: 'Horizontal',
      children: [
        {
          type: 'Vertical',
          children: [
            {
              type: 'Horizontal',
              children: [
                {
                  type: 'ContentElement',
                  props: {
                    content: 'This is a content element',
                  },
                },
                {
                  type: 'Field',
                  property: 'name',
                },
                {
                  type: 'Field',
                  property: 'profile',
                },
              ],
            },
            {
              type: 'Div',
              props: {
                style: {
                  display: 'inline-block',
                },
              },
              children: [
                {
                  type: 'Field',
                  property: 'birthday',
                },
                {
                  type: 'Field',
                  property: 'gender',
                },
              ],
            },
          ],
        },
        {
          type: 'Field',
          property: 'signature',
        },
      ],
    },
    {
      type: 'Horizontal',
      children: [
        {
          type: 'Field',
          property: 'address',
        },
        {
          type: 'Field',
          property: 'tags',
        },
      ],
    },
  ],
  name: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '姓名',
    'ui:label': false,
  },
  profile: {
    // same to 'ui:x-layout': [Field<nickname>, Field<email>]
    // but without className defined
    'ui:label': false,
    'ui:order': ['nickname', 'email'],
    nickname: {
      'ui:widget': 'SingleLineWidget',
      'ui:placeholder': '昵称',
      'ui:label': false,
    },
  },
  signature: {
    'ui:widget': 'SignatureWidget',
    'ui:x-penColor': 'black',
    'ui:label': false,
  },
  birthday: {
    'ui:widget': 'DateWidget',
    'ui:x-format': 'yyyy-MM-dd',
    'ui:label': false,
    'ui:placeholder': '出生日期',
  },
  gender: {
    'ui:widget': 'RadioButtonWidget',
    'ui:x-display': 'select',
    'ui:placeholder': '性别',
    'ui:label': false,
  },
  address: {
    'ui:widget': 'SingleLineWidget',
    'ui:placeholder': '家庭住址',
    'ui:label': false,
  },
  tags: {
    // you can define ui:options to tags property of person
    // like disable person.tags's label
    'ui:label': false,
    items: {
      'ui:label': false,
      /**
       * Inner layout
       * -----------------------
       * | title    | color    |
       * -----------------------
       */
      'ui:x-layout': {
        type: 'Horizontal',
        children: [
          {
            type: 'Field',
            property: 'title',
          },
          {
            type: 'Field',
            property: 'color',
            children: [],
          },
        ],
      },
      title: {
        'ui:widget': 'SingleLineWidget',
        'ui:placeholder': '标签名称',
        'ui:label': false,
      },
      color: {
        'ui:widget': 'RadioButtonWidget',
        'ui:x-display': 'select',
        'ui:label': false,
        'ui:placeholder': '标签颜色',
      },
    },
  },
}

export default LayoutedFormUISchema
