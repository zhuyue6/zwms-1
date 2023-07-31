<template>
  <searchTable
    :searchList="searchList"
    :tableColumns="tableColumns"
    :fetchData="fetchData"
  />
</template>

<script setup lang="ts">

import searchTable from '@/components/pageTemplate/searchTable.vue'
import {  CTableColumnInstance } from '@/components'
import { SearchItem, SearchParams } from '@/components/searchPanel/type'
import { tableColumnPresets as columns } from '@/shared/constant'
import { useDaysTimeRange } from '@/hooks'
import { getSalesSite26 } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    value: useDaysTimeRange(30),
  }
]
const tableColumns: CTableColumnInstance[]  =  [
  columns.siteId,
  columns.siteName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesGoodsSellCount,
  columns.salesOrderCount,
]

async function fetchData(params: SearchParams) {
  return getSalesSite26(params as any).then((res)=>{
    const list = res ?? []
    return {
      total: list.length,
      list,
    }
  })
}
</script>
