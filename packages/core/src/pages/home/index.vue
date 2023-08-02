<template>
  <el-container style="height: 100%">
    <el-header v-show="headerVisible">
      <HomeHeader />
    </el-header>
    <el-container class="home-container">
      <HomeNavigator />
      <el-main>
        <div class="home-main-container">
          <router-view v-slot="{ Component }">
            <Transition name="scale-slide">
              <component :is="Component" :key="$route.name" />
            </Transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import HomeHeader from './header.vue'
import HomeNavigator from './navigator.vue'
import { util } from '@zwms/shared'
import { shallowRef, onMounted } from 'vue'
const headerVisible = shallowRef<boolean>(true)
onMounted(() => {
  headerVisible.value = util.getUrlQuery('hiddenModules') !== 'header'
})
</script>

<style scoped lang="scss">
@use '@/styles/common';
:deep {
  .el-header {
    border-bottom: 1px solid #dcdfe6;
  }
}
.home-container {
  height: 0;
  .home-main-container {
    position: relative;
    height: 100%;
  }
}

.scale-slide-enter-active {
  position: absolute;
  transition: all 0.6s ease 0.3s;
}
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.4s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  opacity: 0.7;
  transform: scale(1);
}

.scale-slide-leave-to {
  opacity: 0.4;
  transform: scale(0.8);
}
</style>
