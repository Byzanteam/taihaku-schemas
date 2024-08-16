export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Order {
  field: string
  direction: `${OrderDirection}`
}

export type Sorters = Array<Order>
