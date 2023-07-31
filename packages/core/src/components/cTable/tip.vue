<template>
  <div class="ctable-tip-container">
      {{ label }}
      <Tip
        v-if="tip"
        :content="tip"
      />
  </div>
</template>
<script setup lang="ts">
  import Tip from '../tips/index.vue'
  interface Props {
    label?: string
    tip?: string
  }
  defineProps<Props>()
</script>
<style scoped lang="scss">
  @use "@/styles/common";
  .ctable-tip-container {
    @include common.flex(flex-start,center, row, wrap, inline-flex);
  }
</style>