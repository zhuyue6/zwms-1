<template>
  <div class="table-cell" v-if="isEllipsis">
    <el-tooltip placement="top" effect="dark" :hide-after="0" :content="text">
      <div class="table-cell-content">
        text
      </div>
    </el-tooltip>
  </div>
  <span v-else :title="text">{{ text }}</span>
</template>
<script lang="ts" setup>
import { isEmpty } from '@/shared/util'
import { computed } from 'vue'

const props = defineProps<{
  text: any
  isEllipsis?: boolean
}>()

const text = computed<string>(()=>{
  return isEmpty(props.text) ? '-' : props.text
})
</script>
<style lang="scss" scoped>
@use '@/styles/common';
.table-cell {
  @include common.flex(flex-start);
  width: 100%;
  .table-cell-content {
    @include common.overflowEllipsis;
  }
}
</style>
