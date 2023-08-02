<template>
  <el-cascader
    :props="areaProps"
    v-model="state.value"
    @change="change"
    collapse-tags
    collapse-tags-tooltip
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { getChildRegion } from '@/services/common'

interface State {
  value: string[]
}

interface Props {
  modelValue: string[]
}

const state: State = reactive({
  value: [],
})
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

function change(data: string[]) {
  emit('update:modelValue', data)
}

watchEffect(() => {
  state.value = props.modelValue
})

const areaProps = {
  lazy: true,
  checkStrictly: true,
  multiple: true,
  emitPath: false,
  lazyLoad: async (node: any, resolve: typeof Promise.resolve) => {
    if (node.data) {
      if (node.level === 3) {
        return resolve([])
      }
      let list = await getAreaList(node.data.value)
      if (node.level === 2) {
        list = list.map((item) => ({
          ...item,
          leaf: true,
        }))
      }
      resolve(list)
    }
  },
}

function getAreaList(regionCode = 0, leaf = false) {
  return getChildRegion({
    regionCode,
  }).then((res) => {
    if (res) {
      return res.map((item) => ({
        pid: item.pid,
        label: item.regionName,
        value: item.regionCode,
        leaf,
        type: item.type,
      }))
    }
    return []
  })
}
</script>
<style lang="scss" scoped></style>
