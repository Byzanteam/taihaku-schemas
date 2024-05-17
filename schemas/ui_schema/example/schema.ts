// JSONSchema draft07
const PersonSchema = {
  title: 'Person',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: ['male', 'female', 'unknown'],
    },
    birthday: {
      type: 'string',
      format: 'date',
      title: '生日',
    },
    idNumber: {
      type: 'string',
      title: '身份证号',
    },
    profession: {
      type: 'string',
      title: '职业',
      oneOf: [
        { const: '1', title: '教师' },
        { const: '2', title: '医生' },
        { const: '3', title: '科学家' },
        { const: '4', title: '公务员' },
      ],
    },
    sports: {
      type: 'array',
      title: '喜欢的运动',
      uniqueItems: true,
      items: {
        type: 'string',
        oneOf: [
          { const: 'football', title: '足球' },
          { const: 'cricket', title: '板球' },
          { const: 'hockey', title: '曲棍球' },
          { const: 'tennis', title: '网球' },
          { const: 'volleyball', title: '排球' },
        ],
      },
    },
    signature: {
      title: '签字',
      type: 'string',
      contentEncoding: 'base64',
      contentMediaType: 'image/png',
    },
  },
}

export default PersonSchema
