<template>
  <el-cascader
    :props="siteProps"
    v-model="state.value"
    @change="change"
    collapse-tags
    collapse-tags-tooltip
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { getSiteChild } from '@/services/common'

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

const siteProps = {
  lazy: true,
  checkStrictly: true,
  multiple: true,
  emitPath: false,
  lazyLoad: async (node: any, resolve: typeof Promise.resolve) => {
    if (node.data) {
      let list = await getSiteList(node.data.value)
      resolve(list)
    }
  },
}

function getSiteList(site_id = '0', leaf = false) {
  return getSiteChild({
    site_id,
  }).then((res) => {
    if (res) {
      return res.map((item) => ({
        label: item.siteName,
        value: item.siteId,
        leaf,
      }))
    }
    return []
  })
}
</script>
<style lang="scss" scoped></style>
