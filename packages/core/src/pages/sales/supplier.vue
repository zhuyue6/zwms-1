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
import { getSupplierSales } from '@/services'

const searchList: SearchItem[] = [
  {
    type: 'dateRange',
    key: 'dateRange',
    value: useDaysTimeRange(30),
  },
  {
    type: 'input',
    title: '店铺ID',
    key: 'storeIds',
    tip: '可输入多个店铺ID，用“,”隔开',
    transformListParams: true,
    value: '',
  },
  {
    type: 'input',
    title: '商家ID',
    key: 'supplierIds',
    tip: '可输入多个商家ID，用“,”隔开',
    transformListParams: true,
    value: '',
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
  columns.storeId,
  columns.storeName,
  columns.siteName,
  columns.gmv,
  columns.gmvOrderCount,
  columns.gmvGoodsSellCount,
  columns.sales,
  columns.salesGoodsSellCount,
  columns.salesOrderCount,
]

async function fetchData(params: SearchParams) {
  return getSupplierSales(params as any).then((res) => {
    const list = res.rows ?? []
    return {
      total: res.totalNum ?? list.length,
      list,
    }
  })
}
</script>
