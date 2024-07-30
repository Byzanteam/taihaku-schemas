interface BaseFetching {
  name: string
}

interface AssociationFetching extends BaseFetching {
  type: 'association'
  through: Array<string>
  schema: Array<Fetching>
}

interface ColumnFetching extends BaseFetching {
  type: 'column'
  column: string
}

export type Fetching = AssociationFetching | ColumnFetching
