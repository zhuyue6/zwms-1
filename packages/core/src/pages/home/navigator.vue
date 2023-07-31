<template>
  <scrollbar :scrollX="false" width="200">
    <el-aside class="aside-container">
      <el-menu :default-active="route.path" :router="true">
        <template v-for="item of menus">
          <template v-if="item.children && item.children.length > 0">
            <el-sub-menu :index="(item.path as string)" :key="item.key">
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                :key="childItem.path"
                :index="childItem.path"
                v-for="childItem of item.children"
              >
                <el-icon v-if="childItem.icon">
                  <component :is="childItem.icon" />
                </el-icon>
                <span>{{ childItem.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>
  </scrollbar>
</template>

<script setup lang="ts">
import scrollbar from '@/components/scrollbar/index.vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { type Component, ref } from 'vue'
import { useRoute } from 'vue-router'
import { routes, IRouter } from '@/router'

interface Menu {
  title?: string
  path?: string
  key?: string
  icon?: Component
  active?: boolean
  children?: Menu[]
}

const route = useRoute()

const menus = ref<Menu[]>([])

function formatRoutes(routes: IRouter[], basePath = '', isRoot = false) {
  let list: Menu[] = []
  for (const routeItem of routes ?? []) {
    if (isRoot && routeItem.name === 'home') {
      list = formatRoutes(
        routeItem.children as IRouter[],
        basePath + routeItem.path
      )
      break
    }
    if (!isRoot && routeItem.isNavigator) {
      const path =
        routeItem.path !== ''
          ? basePath + '/' + routeItem.path
          : basePath + routeItem.path
      const menu: Menu = {
        title: routeItem.meta?.title as string,
        path,
        icon: routeItem.icon,
        children: formatRoutes(routeItem.children as IRouter[], path),
      }
      list.push(menu)
    }
  }
  return list
}

menus.value = formatRoutes(routes, '', true)
</script>

<style scoped lang="scss">
.aside-container {
  padding-top: 1px;
  width: 200px;
}
</style>
