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
import { getLiveSalesTotalSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'input',
    title: '直播间ID',
    tip: '可输入多个直播间ID，用“，”隔开',
    key: 'activityIds',
    transformListParams: true,
    value: '',
  },
]
const tableColumns: CTableColumnInstance[] = [
  columns.activityId,
  { ...columns.title, label: '直播间名称' },
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesOrderCount,
  columns.salesGoodsSellCount,
]

async function fetchData(searchParams: SearchParams) {
  return getLiveSalesTotalSales(searchParams as any).then((res) => {
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
