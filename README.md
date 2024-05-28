# Schemas for taihaku

# 错误定义

## Elixir 端给出的错误

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

- `absoluteKeywordLocation` - 指向 schema 中出错的关键词
- `instanceLocation` - 指向数据中出错的值

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
      "absoluteKeywordLocation": "#/paramsSchema/required/0",
      "instanceLocation": "/"
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
      "absoluteKeywordLocation": "#/changeset/changes/0/maxLength",
      "instanceLocation": "/title"
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
      "absoluteKeywordLocation": "#/changeset/validator/schema/properties/release_date/format",
      "instanceLocation": "/release_date"
    }
  ]
}
```

</details>

### Validation 执行时出错

Persistence Schema 中可能声明多个 validations，当 validation 的执行失败时，错误
信息将通过以下格式返回。

- `absoluteValidationLocation` - 指出失败的 validation 位置
- `instanceLocation` - 使用 validation 中定义的 errorKey
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
      "absoluteValidationLocation": "#/changeset/validator/validations/0",
      "instanceLocation": "/release_date",
      "dependencies": ["/release_date"],
      "errorMessage": "excessive time"
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

## Nextjs 后端给出的错误

在 next 后端拿到 Elixir 给出的错误后结合 action
的定义给出更具体的错误，浏览器会接收到该错误并渲染到用户填写的表单中。

### 非运行时错误

把 Elixir 端给出的错误与 action 的定义结合后得到的精确到表单字段路径上的错误，这一类错误为 JSONSchema 校验错误和
Validation 错误的集合，均会把错误定位到具体的表单字段路径上。

#### JSONSchema 校验错误

该错误是由自己的值通过 JSONSchema 校验失败得到的。

- `errorLocation` - 产生的错误在 JSONSchema 中的位置
- `dependencies` - 产生该错误的依赖字段的位置（在这种错误中就是它自己的路径）
- `errorKeyword` - 校验错误的类型，都属于
  [JSONSchema 的校验 keyword](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01#section-6)
- `keywordSchema` - 错误类型在 jsonSchema 中对应的值，通过 errorKeyword 和
  keywordSchema 让前端页面实现错误的显示

<details>
<summary>JSONSchema 字段校验失败</summary>

```TypeScript
params = {
  release_date: '2024-05-74',
}
```

```JSON
{
  "errors": [
    {
      "errorLocation": "/title",
      "errorKeyword": "required",
      "keywordSchema": null,
      "dependencies": ["/title"]
    },
    {
      "errorLocation": "/release_data",
      "errorKeyword": "format",
      "keywordSchema": "date",
      "dependencies": ["/release_data"]
    }
  ]
}
```

</details>

#### Validation 校验错误

- `errorLocation` - 产生的错误在 JSONSchema 中的位置
- `errorMessage` - 错误信息
- `dependencies` - 产生该错误的依赖字段的位置

<details>
<summary></summary>

```TypeScript
params = {
  title: 'a title',
  release_date: '4024-05-14',
}
```

```JSONC
{
  "errors": [
    {
      "errorLocation": "/release_date",
      "errorMessage": "excessive time",
      "dependencies": ["/release_date"]
    }
  ]
}
```

</details>

### 运行时错误

和 Elixir 给出的错误和含义均相同。

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
