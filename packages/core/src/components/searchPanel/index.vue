<template>
  <div class="search-condition-container">
    <div class="search-condition">
       <Scrollbar :scrollX="false" class="search-scrollbar">
        <div class="search-condition-content">
          <template v-for="item of searchList" :key="item.key">
            <div
              class="search-condition-content-item"
              v-if="item.type === 'dateRange'"
            >
              <span class="search-condition-content-item-title">
                {{ item.title ? item.title : '选择时间' }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <el-date-picker
                v-model="state.searchParams[item.key]"
                :clearable="false"
                :disabled-date="($event: any) => timeLimit($event, item)"
                value-format="YYYYMMDD"
                type="daterange"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
              />
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'area'"
            >
              <span class="search-condition-content-item-title">
                {{ item.title ? item.title : '地区筛选' }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <Area v-model="state.searchParams[item.key]" style="width: 400px" />
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'site'"
            >
              <span class="search-condition-content-item-title">
                {{ item.title ? item.title : '地区筛选' }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <Site v-model="state.searchParams[item.key]" style="width: 400px" />
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'category'"
            >
              <span class="search-condition-content-item-title">
                {{ item.title ? item.title : '类目筛选' }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <Category v-model="state.searchParams[item.key]" :categoryType="item.categoryType" :level="item.level" :isMultiple="item.isMultiple" style="width: 400px" />
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'activity'"
            >
              <span class="search-condition-content-item-title">
                {{ item.title ? item.title : '活动筛选' }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <Activity v-model="state.searchParams[item.key]" style="width: 400px" />
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'select'"
            >
              <span class="search-condition-content-item-title"
                >{{ item.title }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <el-select v-model="state.searchParams[item.key]" :clearable="true">
                <el-option v-for="option of item.options"
                  :label="option.label"
                  :key="option.value"
                  :value="option.value"
                />
              </el-select>
            </div>
            <div
              class="search-condition-content-item"
              v-if="item.type === 'input'"
            >
              <span class="search-condition-content-item-title"
                >{{ item.title }}
                <Tip
                  :content="item.tip"
                  v-if="item.tip"
                />
              </span>
              <el-input v-model="state.searchParams[item.key]" :clearable="true"/>
            </div>
          </template>
        </div>
      </Scrollbar>
      <div class="search-operates">
        <el-button type="primary" @click="doReset">重置</el-button>
        <el-button type="primary" @click="doSearch">搜索</el-button>
        <el-button type="primary" @click="doExport">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import Area from './area.vue'
import Site from './site.vue'
import Category from './category.vue'
import Activity from './activity.vue'
import { simpleDeepCopy } from '@/shared/util'
import Tip from '../tips/index.vue'
import { SearchItem } from './type'
import moment from 'moment'
import Scrollbar from '../scrollbar/index.vue'

interface Props {
  searchList: SearchItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'search', data: Partial<SearchParams>): void
  (e: 'export', data: Partial<SearchParams>): void
  (e: 'reset', data: Partial<SearchParams>): void
}>()

interface SearchParams {
  [key: string]: any
}

interface State {
  searchParams: SearchParams
}

const initSearchParams: SearchParams = {}

const state: State = reactive({
  searchParams: {},
})

onBeforeMount(() => {
  for (const searchItem of props.searchList) {
    if (searchItem.key) {
      state.searchParams[searchItem.key] = searchItem.value
      initSearchParams[searchItem.key] = searchItem.value
    }
  }
})

function doReset() {
  state.searchParams = simpleDeepCopy(initSearchParams)
  emit('reset', state.searchParams)
}

function doExport() {
  emit('export', state.searchParams)
}

function doSearch() {
  emit('search', state.searchParams)
}

function timeLimit(date: Date, item: SearchItem) {
  if (item.startTime || item.endTime) {
    const newTimeStamp: any = moment(date).format('X')
    const startTimeStamp: any = moment(item.startTime).format('X')
    const endTimeStamp: any = moment(item.endTime).format('X')
    return !(newTimeStamp - startTimeStamp >= 0 && newTimeStamp - endTimeStamp <= 0)
  }
  return false
}

</script>

<style scoped lang="scss">
@use '@/styles/common';
.search-condition-container {
  @include common.box;
  height: auto;
  margin-bottom: 20px;
  .search-condition {
    @include common.flex(space-between, center, row, nowrap);
    flex-grow: 1;
    margin-right: 20px;
    .search-scrollbar {
      flex-shrink: 1;
      max-height: 200px;
    }
    .search-condition-content {
      @include common.flex(flex-start);
      .search-condition-content-item {
        min-width: 300px;
        @include common.flex(flex-start, center, null, nowrap);
        margin: 0 20px 20px 0;
        .search-condition-content-item-title {
          margin-right: 8px;
          flex-shrink: 0;
          @include common.flex;
          @include common.font(14px);
        }
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .search-operates {
      flex-shrink: 0;
      margin-left: 20px;
    }
  }
}
</style>
