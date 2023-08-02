<template>
  <searchTable
    :searchList="searchList"
    :tableColumns="tableColumns"
    :fetchData="fetchData"
  />
</template>

<script setup lang="ts">
import searchTable from '@/components/pageTemplate/searchTable.vue'
import { CTableColumnInstance } from '@/components'
import { SearchItem, SearchParams } from '@/components/searchPanel/type'
import { tableColumnPresets as columns } from '@/commons/constant'
import { useDaysTimeRange } from '@zwms/hooks'
import { getPlatSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    value: useDaysTimeRange(30),
  },
]

const tableColumns: CTableColumnInstance[] = [
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesGoodsSellCount,
  columns.salesOrderCount,
]

async function fetchData(searchParams: SearchParams) {
  return getPlatSales(searchParams).then((res) => {
    const list = res ?? []
    return {
      total: list.length,
      list,
    }
  })
}
</script>
