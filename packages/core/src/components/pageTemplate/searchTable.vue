<template>
  <div class="container">
    <SearchPanel :searchList="props.searchList" @search="search" @export="exportExcel" @reset="reset" />
    <div class="home-table-container">
      <CTable
        :fetch-data="(fetchData as any)"
        ref="cTableRef"
        :mountedGetData="props.mountedGetData"
        :columns="props.tableColumns"
      >
      </CTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SearchPanel, CTable, CTableColumnInstance } from '@/components'
import { ref, watchEffect } from 'vue'
import { SearchItem, SearchParams } from '@/components/searchPanel/type'
import { util } from '@/shared'
import { useRoute } from 'vue-router'
import { useUserInfo } from '@/hooks'

const { userInfo } = useUserInfo()

interface Props {
  fetchData: (searchParams: SearchParams) => Promise<any>,
  mountedGetData: boolean,
  tableColumns: CTableColumnInstance[]
  searchList: SearchItem[]
}

const props = withDefaults(defineProps<Props>(), {
  mountedGetData: true,
  searchList: () => []
})

let searchParams = ref<SearchItem[]>([])

watchEffect(()=>{
  searchParams.value = props.searchList
})

const route = useRoute()
const cTableRef = ref<typeof CTable | null >(null)

function search(params: SearchParams, isReset=false) {
  for (const [key, value] of Object.entries(params)) {
    for (const searchParam of searchParams.value) {
      if (key === searchParam.key) {
        searchParam.value = value
      }
    }
  }
  cTableRef.value?.refresh(isReset)
}

function reset(params: SearchParams) {
  search(params, true)
}

function exportExcel() {
  util.exportExcel(route, cTableRef, props.tableColumns)
}

async function fetchData(pageNum: number, pageSize: number, sort?: string, order?: string) {
  const params: SearchParams = {}
  for (const item of searchParams.value) {
    if (item.type === 'dateRange') {
      params.beginTime = item['value'][0]
      params.endTime = item['value'][1]
    } else if (item.transformListParams) {
      params[item.key] = util.transformListParams(item.value, item.formatType)
    } else {
      params[item.key] = item.value
    }
  }
  
  return props.fetchData({
    sortField: sort,
    sortValue: order,
    ...params,
    projectCode: userInfo.value?.projectCode,
    pageSize,
    pageNum,
  })
}

</script>
<style scoped lang="scss">
@use '@/styles/common';
.container {
  @include common.box;
  @include common.flex(flex-start, null, column);
  .home-table-container {
    @include common.box;
    height: 0;
    flex-grow: 1;
  }
}
</style>
