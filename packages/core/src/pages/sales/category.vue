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
import { getCategorySales } from '@/services'
import { tableColumnPresets as columns } from '@/commons/constant'
import { useDaysTimeRange } from '@zwms/hooks'

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
    type: 'category',
    title: '商品类目',
    key: 'categoryIds',
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
  columns.categoryName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesOrderCount,
  columns.salesGoodsSellCount,
]

async function fetchData(searchParams: SearchParams) {
  return getCategorySales(searchParams as any).then((res) => {
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
