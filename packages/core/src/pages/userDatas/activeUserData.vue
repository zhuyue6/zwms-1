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
import { getActiveUserData } from '@/services'
import { util } from '@/shared'
import { useDaysTimeRange } from '@/hooks'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    title: '活动时间',
    value: useDaysTimeRange(30),
  },
  {
    type: 'activity',
    key: 'promIds',
    transformListParams: true,
    value: [],
  }
]
const tableColumns: CTableColumnInstance[] = [
  { ...columns.rank, label: '序号' },
  { ...columns.title, label: '活动名称', width: 400 },
  columns.addUserCount,
  columns.rate,
  columns.orderUserCount,
  columns.time
]


async function fetchData(searchParams: SearchParams) {
  return getActiveUserData(searchParams as any).then((res) => {
    let list = res.rows ?? []
    list = list.map((item)=>({
      ...item,
      time: util.formatTime(item.time)
    }))
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
