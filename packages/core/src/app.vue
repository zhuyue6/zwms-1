<template>
  <div class="root">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/common';
.root {
  @include common.box;
  min-width: 1000px;
}
</style>
