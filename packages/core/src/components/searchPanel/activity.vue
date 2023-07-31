<template>
  <el-select multiple v-model="state.value" clearable filterable placeholder="请选择活动" @change="change">
    <el-option
      v-for="item in state.list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { reactive, watchEffect, onBeforeMount } from 'vue'
import { getTradePromList } from '@/services/common'
import { ElOption } from 'element-plus'

interface Option {
  value: string | number,
  label: string,
}

interface State {
  value: string[]
  list: Option[]
}

interface Props {
  modelValue: string[]
}

const state: State = reactive({
  value: [],
  list: []
})
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

function change(data: string[]) {
  emit('update:modelValue', data)
}

watchEffect(() => {
  state.value = props.modelValue
})

function getList() {
  return getTradePromList({
    currPage: 1,
    pageSize: 10000
  }).then((res) => {
    let list: Option[] = []
    if (res) {
      list =  res.records.map((item) => ({
        label: item.title,
        value: item.id,
      }))
    }
    state.list = list
  })
}

onBeforeMount(()=>{
  getList()
})

</script>