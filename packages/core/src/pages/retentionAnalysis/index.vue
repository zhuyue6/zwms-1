<template>
  <div class="container">
    <Chart />
  </div>
</template>
<script setup lang="ts">
import { Chart } from '@/components'
</script>
<style scoped lang="scss">
@use '@/styles/common';
.container {
  @include common.box;
}
</style>
