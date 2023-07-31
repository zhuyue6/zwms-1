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
import { getPromSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    value: useDaysTimeRange(30),
  },
  {
    type: 'activity',
    key: 'promIds',
    transformListParams: true,
    value: [],
  }
]
const tableColumns: CTableColumnInstance[]  =  [
  columns.promId,
  columns.promName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesOrderCount,
  columns.salesGoodsSellCount,
]

async function fetchData(searchParams: SearchParams) {
  return getPromSales(searchParams as any).then((res)=>{
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>