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
import { getLiveGoodSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'input',
    title: '直播间ID',
    key: 'activityIds',
    transformListParams: true,
    value: '',
  }
]
const tableColumns: CTableColumnInstance[]  =  [
  columns.goodsId,
  columns.goodsName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesOrderCount,
  columns.salesGoodsSellCount
]

async function fetchData(searchParams: SearchParams) {
  return getLiveGoodSales(searchParams as any).then((res)=>{
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
