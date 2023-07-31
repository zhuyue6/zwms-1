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
import { getSupplierExamine } from '@/services'
import { util } from '@/shared'
import { tableColumnPresets as columns } from '@/shared/constant'
import { useDaysTimeRange } from '@/hooks'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    tip: '日期只能选择近3个月',
    value: useDaysTimeRange(1),
    startTime: useDaysTimeRange(90)[0],
    endTime: useDaysTimeRange(90)[1],
  },
  {
    type: 'input',
    title: '店铺ID',
    key: 'storeIdList',
    formatType: 'normal',
    tip: '多个ID可用"，"分隔开',
    transformListParams: true,
    value: '',
  },
  {
    type: 'category',
    title: '主营类目',
    key: 'primaryCategoryId',
    categoryType: 'main',
    isMultiple: false,
    value: '',
  },
]

const tableColumns: CTableColumnInstance[]  =  [
  { ...columns.time, sortable: false },
  { ...columns.storeName, sortable: false },
  columns.primaryCategoryName,
  columns.thirtySales,
  columns.salesRankStar,
  columns.thirtyOrderCount,
  columns.thirtyQualityRefundRatio,
  columns.qualityRefundRankStar,
  columns.thirtyDisputeRefundRatio,
  columns.disputeRefundRankStar,
  columns.thirtyRefundTime,
  columns.refundTimeRankStar,
  columns.thirtyDeliveryTime,
  columns.deliveryTimeRankStar,
]

async function fetchData(searchParams: SearchParams) {
  return getSupplierExamine({ ...searchParams, currentPage: searchParams.pageNum } ).then((res)=>{
    const list = (res?.records ?? []).map((item)=> ({
      ...item,
      time: util.formatTime(String(item.time))
    }))
    return {
      total: res?.total ?? list.length,
      list,
    }
  })
}
</script>
