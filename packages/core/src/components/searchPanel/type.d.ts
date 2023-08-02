export interface SearchItem {
  type:
    | 'dateRange'
    | 'area'
    | 'input'
    | 'site'
    | 'category'
    | 'activity'
    | 'select'
  categoryType?: 'main'
  options?: { value: string | number; label: string | number }[]
  title?: string
  tip?: string
  key: string
  level?: number
  isMultiple?: boolean
  formatType?: string
  startTime?: any
  endTime?: any
  transformListParams?: boolean
  value: string | unknown[] | any
}

export type SearchParams = Record<string, any>
