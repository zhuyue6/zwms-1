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
import { getCouponDetail } from '@/services'


const searchList: SearchItem[] = [
  {
    type: 'input',
    title: '优惠券ID',
    key: 'couponIds',
    transformListParams: true,
    tip: '可输入多个优惠券ID，用“,”隔开',
    value: '',
  }
]
const tableColumns: CTableColumnInstance[]  =  [
    columns.couponId,
    columns.couponName,
    columns.orderNo,
    columns.subOrderNo,
    columns.siteName,
    columns.supplierName,
    columns.goodsName,
    columns.sellPrice,
    columns.promPrice,
    columns.platDiscount,
    columns.storeDiscount,
    columns.sellCount,
    columns.payment,
    columns.sales,
    columns.userId,
    columns.mobile,
    columns.address,
    columns.orderStatus,
    columns.receiveTime
]

async function fetchData(searchParams: SearchParams) {
  return getCouponDetail(searchParams as any).then((res)=>{
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
