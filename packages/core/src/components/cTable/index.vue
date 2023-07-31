<template>
  <div class="table-container" ref="tableContainerRef">
    <div :class="['table-content', state.tableData.length > 0 ? 'full-screen' : '']">
      <el-table
        :data="state.tableData"
        :height="tableHeight - 32"
        v-loading="state.loading"
        element-loading-text="正在加载数据，请稍后..."
        :defaultSort="(defaultSort as any)"
        @sort-change="sortChange"
        stripe
        ref="tableRef"
      >
        <template v-if="(columns?.length as number) > 0">
          <template v-for="column of columns" :key="column.prop">
            <el-table-column v-if="column.slot" :="column">
              <template #header>
                <Tip 
                  :label="column.label"
                  :tip="column.tip"
                />
              </template>
              <template #default="{ row }">
                <slot :name="column.prop" :row="row" :column="column" />
              </template>
            </el-table-column>
            <el-table-column v-else :="column">
              <template #header>
                <Tip 
                  :label="column.label"
                  :tip="column.tip"
                />
              </template>
              <template #default="{ row }">
                <textEllipsis :type="column.textEllipsis" :text="row[column.prop as string]" />
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="table-page" v-if="pageVisible">
      <el-pagination
        v-model:current-page="state.currentPage"
        v-model:page-size="state.pageSize"
        :page-sizes="state.pageSizes"
        layout="total, prev, pager, next, sizes, jumper"
        :total="state.total"
        :small="false"
        @current-change="getData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from 'vue'
import { useDomGeometry } from '@/hooks'
import textEllipsis from './textEllipsis.vue'
import { CTableColumnInstance } from './type'
import { ElMessage, ElTable } from 'element-plus'
import { simpleDeepCopy } from '@/shared/util'
import Tip from './tip.vue'

interface State {
  currentPage: number
  pageSize: number
  total: number
  tableData: any[]
  loading: boolean
  pageSizes: number[]
  sortByApi: boolean
  sort: {
    order: string,
    prop: string
  }
}

const state: State = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  tableData: [],
  loading: false,
  sortByApi: false,
  pageSizes: [10, 20, 50, 100, 300, 500],
  sort: {
    order: '',
    prop: ''
  }
})

interface Props {
  columns?: CTableColumnInstance[]
  pageVisible?: boolean
  defaultSort?: { prop?: string, order?: string}
  mountedGetData: boolean
  fetchData: (
    currentPage?: string | number,
    pageSize?: string | number,
    sort?: string,
    order?: string
  ) =>
    {
        total: number | string
        list: any[]
      }
    | Promise<{
        total: number | string
        list: any[]
      }>
}

const props = withDefaults(defineProps<Props>(), {
  pageVisible: true,
  mountedGetData: true,
})

watch(
  () => state.pageSize,
  () => {
    getData()
  }
)

const tableContainerRef = ref<HTMLDivElement | null>(null)

const tableRef = ref<HTMLDivElement | null>(null)

const { height } = useDomGeometry(tableContainerRef as any)

const tableHeight = computed(()=>{
  return height.value > 0 ? height.value - 12 : 0
})

onMounted(() => {
  if (props.mountedGetData) getData()
})

async function getData() {
  if (state.loading) {
    ElMessage({
      message: '正在获取数据，请稍后再试。',
      type: 'info',
    })
    return
  }
  state.loading = true
  let params: string[] = []
  if (state.sortByApi) {
    params = [state.sort.prop, state.sort.order]
  }
  return fetchData(...params).finally(()=>{
    state.loading = false
  })
}

async function fetchData(sort?: string, order?: string): Promise<[any[], number]> {
  const { total, list } = await props.fetchData(
    state.currentPage,
    state.pageSize,
    sort,
    order
  )
  const formatList = list.map((item, index)=>({
    ...item,
    columnIndex: (index + 1) + (state.currentPage - 1 ) * state.pageSize
  }));

  [state.total, state.tableData] = [Number(total ?? 0), formatList]
  return [ state.tableData, state.total ]
}

function sortChange(sortParams: {
  prop: string
  order: string
}) {
  state.sortByApi = false // 是否是后端排序
  state.sort.prop = ''
  state.sort.order = ''
  for (const column of (props?.columns ?? [])) {
    if (column.sortProp !== undefined && sortParams.prop === column.prop) {
      state.sortByApi = true
      // 如果排序中止则还原
      if (sortParams.order) {
        state.sort.prop = column.sortProp === true ? column.prop as string : column.sortProp as string
        state.sort.order = sortParams.order !== 'descending' ? '1' : '2'
      }
      break
    }
  }
  
  if (state.sortByApi) {
    // 后端排序就去拉数据
    getData()
  } else {
    state.sort.prop = sortParams.prop
    state.sort.order = sortParams.order
  }
}

async function getTableData() {
  let sortTableData: unknown[] = simpleDeepCopy(state.tableData)
  if (!state.sortByApi) {
    sortTableData = sortTableData.sort((a: any, b: any)=> {
      if (state.sort.order === 'descending') {
        return b[state.sort.prop] - a[state.sort.prop]
      }
      return a[state.sort.prop] - b[state.sort.prop]
    })
  }
  return sortTableData
}

function refresh(isReset=false) {
  state.currentPage = 1
  if (isReset) {
    state.pageSize = 10
    state.sort.prop = ''
    state.sort.order = '';
    (tableRef.value as any)?.clearSort()
  }
  
  getData()
}

defineExpose({
  refresh,
  state,
  getTableData,
})
</script>

<style lang="scss" scoped>
@use '@/styles/common';
.table-container {
  width: 100%;
  height: 100%;
  position: relative;
  :deep {
    .el-scrollbar__view {
      width: 100%;
    }
    .el-table__header-wrapper {
      @include common.flex(flex-start, flex-start, null, nowrap);
    }
    .el-table__header {
      flex-grow: 1;
    }
  }
  @include common.flex(space-between, flex-end, column);
  .table-content {
    width: 100%;
    height: 0;
    z-index: 0;
    flex-grow: 1;
  }
  .full-screen {
    :deep {
      .el-table__empty-block {
        flex-shrink: 0;
      }
      .el-scrollbar__view {
        display: flex !important;
      }
      .el-table__body {
        flex-grow: 1;
      }
    }
  }
  .table-page {
    position: relative;
    width: 100%;
    display: flex;
    flex-shrink: 0;
    margin-top: 8px;
    background-color: var(--el-bg-color);
    z-index: 1;
  }
}
</style>
