<template>
  <el-cascader
    :props="categoryProps"
    :options="state.list"
    v-model="state.value"
    @change="change"
    collapse-tags
    collapse-tags-tooltip
    clearable
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect, onBeforeMount, computed } from 'vue'
import { getCategory, getOneLevelCategory } from '@/services/common'
import { type CascaderOption } from 'element-plus'

interface State {
  value: string[]
  list: CascaderOption[]
}

interface Props {
  modelValue: string[]
  isMultiple?: boolean
  level?: number
  categoryType?: 'main'
}

const state: State = reactive({
  value: [],
  list: [],
})
const props = withDefaults(defineProps<Props>(), {
  isMultiple: true,
})

const emit = defineEmits(['update:modelValue'])

const categoryProps = computed(() => {
  const cascaderProps = {
    lazy: props.level === undefined && props.categoryType !== 'main',
    checkStrictly: true,
    multiple: props.isMultiple,
    emitPath: false,
    lazyLoad: async (node: any, resolve: typeof Promise.resolve) => {
      if (node.data) {
        let list = await getList(node.data.value, props.level)
        resolve(list)
      }
    },
  }
  return cascaderProps
})

function change(data: string[]) {
  emit('update:modelValue', data)
}

watchEffect(() => {
  state.value = props.modelValue
})

async function getList(parentId = 0, level?: number) {
  let resData = []
  if (props.categoryType === 'main') {
    resData = await getOneLevelCategory().then((res) => {
      let list: CascaderOption[] = []
      if (res) {
        list = (res ?? []).map((item) => ({
          label: item.name,
          value: item.id,
        }))
      }
      return list
    })
  } else {
    resData = await getCategory({
      currentPage: 1,
      pageSize: 1000,
      parentId,
      isBackendList: 0,
      level,
    }).then((res) => {
      let list: CascaderOption[] = []
      if (res) {
        list = (res?.records ?? []).map((item) => ({
          label: item.name,
          value: item.id,
        }))
      }
      return list
    })
  }
  return resData
}

onBeforeMount(async () => {
  state.list = await getList(0, props.level)
})
</script>
