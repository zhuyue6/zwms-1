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
import { getUserData } from '@/services'
import { useDaysTimeRange } from '@/hooks'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    title: '时间选择',
    value: useDaysTimeRange(30),
  },
]
const tableColumns: CTableColumnInstance[] = [
  { ...columns.rank, label: '序号' },
  columns.createTime,
  columns.firstOrderTime,
  columns.userId,
  columns.firstOrderSale,
  columns.firstOrderPaysAmount,
  columns.isUsedNewCoupons,
]

async function fetchData(searchParams: SearchParams) {
  return getUserData(searchParams).then((res) => {
    let list = res.rows ?? []
    list = list.map((item)=>({
        ...item,
        isUsedNewCoupons: item['isUsedNewCoupons'] === '1' ? '是' : '否'
      })
    )
    return {
      total: res.totalNum ?? list.length,
      list
    }
  })
}
</script>
