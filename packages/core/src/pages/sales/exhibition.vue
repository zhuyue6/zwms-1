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
import { getSiteSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    value: useDaysTimeRange(30),
  },
  {
    type: 'site',
    key: 'siteIds',
    transformListParams: true,
    value: [],
  },
  {
    type: 'select',
    title: '排序方式',
    key: 'sortValue',
    options: [
      {
        label: '销售额',
        value: 'sales',
      },
      {
        label: 'GMV',
        value: 'gmv',
      },
    ],
    value: [],
  },
]

const tableColumns: CTableColumnInstance[] = [
  columns.siteId,
  columns.siteName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesGoodsSellCount,
  columns.salesOrderCount,
]

async function fetchData(searchParams: SearchParams) {
  return getSiteSales(searchParams as any).then((res) => {
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
