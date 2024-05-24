# Schemas for taihaku

## 错误定义

在 Persistence Schema 执行的过程中会产生几种不同的错误，后文将通过下面的 Schema
进行说明。

<details>
<summary>Persistence Schema</summary>

```TypeScript
action = {
  schema: moviesSchema,
  paramsSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      release_date: { type: 'string' },
    },
    required: ['title'],
  },
  changeset: {
    changes: [
      {
        name: 'title',
        value: { $data: '/title' },
        schema: { type: 'string', minLength: 10 },
      },
      {
        name: 'release_date',
        value: { $data: '/release_date' },
      },
      { name: 'created_at', value: { $sql: 'now()' } },
      { name: 'updated_at', value: { $sql: 'now()' } },
    ],
    validator: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', maxLength: 255 },
          release_date: { type: 'string', format: 'date' },
        },
        required: ['title', 'release_date'],
      },
      validations: [
        {
          operator: 'CUSTOM',
          operands: [{ $data: '/release_date' }],
          expression: 'Date.parse(operands[0]) <= Date.now()',
          errorKey: '/release_date',
          errorMessage: 'Release date should be less than or equal to today',
        },
      ],
    },
  },
  returningSchema: {
    id: { $schema: '/id' },
    title: { $schema: '/title' },
    release_date: { $schema: '/release_date' },
    inserted_at: { $schema: '/inserted_at' },
    updated_at: { $schema: '/updated_at' },
  },
}
```

</details>

### JSON Schema 校验出错

Persistence Schema 执行过程中会有多处涉及到 JSON Schema 的校验，当校验没有通过时
通过下面的数据结构将错误信息返回。

- `absolute_keyword_location` - 指向 schema 中出错的关键词
- `instance_location` - 指向数据中出错的值

<details>
<summary>paramsSchema 出错</summary>

```TypeScript
params = {
  release_date: '2024-05-14',
}
```

```JSON
{
  "errors": [
    {
      "absolute_keyword_location": "#/paramsSchema/required/0",
      "instance_location": "/"
    }
  ]
}
```

</details>

<details>
<summary>changes 中字段校验失败</summary>

```TypeScript
params = {
  title: 'Title',
  release_date: '2024-05-14',
}
```

```JSON
{
  "errors": [
    {
      "absolute_keyword_location": "#/changeset/changes/0/maxLength",
      "instance_location": "/title"
    }
  ]
}
```

</details>

<details>
<summary>validator schema 校验失败</summary>

```TypeScript
params = {
  title: 'This is a valid title',
  release_date: '2024-05-41',
}
```

```JSON
{
  "errors": [
    {
      "absolute_keyword_location": "#/changeset/validator/schema/properties/release_date/format",
      "instance_location": "/release_date"
    }
  ]
}
```

</details>

### Validation 执行时出错

Persistence Schema 中可能声明多个 validations，当 validation 的执行失败时，错误
信息将通过以下格式返回。

- `absolute_validation_location` - 指出失败的 validation 位置
- `instance_location` - 使用 validation 中定义的 errorKey
- `dependencies` - 声明该 validation 中使用到的数据
- `errorMessage` - validation 失败时给出的错误信息

<details>
<summary>paramsSchema 出错</summary>

```TypeScript
params = {
  title: 'This is a valid title',
  release_date: '4202-05-14',
}
```

```JSON
{
  "errors": [
    {
      "absolute_keyword_location": "#/changeset/validator/validations/0",
      "instance_location": "/release_date",
      "dependencies": ["/release_date"],
      "errorMessage": "too large date"
    }
  ]
}
```

</details>

### 运行时错误

当这一类错误发生时，对用户来说相当于服务器内部错误，无法通过修改参数来解决。因此
不会用来决定页面的交互逻辑，只是返回一些信息能够帮助定位问题出现的原因。

- `location` - 错误出现的位置
- `message` - 错误信息的描述

<details>
<summary>returningSchema 中指定的列不存在</summary>

```TypeScript
params = {
  title: 'This is a valid title',
  release_date: '2024-05-14',
}
```

```JSON
{
  "errors": [
    {
      "location": "#/returningSchema/inserted_at",
      "message": "column \"inserted_at\" does not exist"
    }
  ]
}
```

</details>
