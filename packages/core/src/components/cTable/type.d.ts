import { TableColumnInstance } from 'element-plus'
import { type Component } from 'vue'
export type CTableColumnInstance = Partial<TableColumnInstance> & {
  columnType?: string
  component?: Component
  textEllipsis?: boolean
  slot?: boolean
  tip?: string
  sortProp?: string | boolean | number
}
