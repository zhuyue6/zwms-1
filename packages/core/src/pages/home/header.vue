<template>
  <div class="container">
    <div class="logo">
      <h1>{{ config.title }}</h1>
    </div>
    <div class="header-right-container">
      <el-switch
        v-model="themeDark"
        @change="changeTheme"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="MoonNight"
      />
      <div class="user-container">
        <div class="user-info">
          <el-tooltip
            effect="dark"
            :hide-after="0"
            :content="state.userInfo?.username"
          >
            <span>{{ state.userInfo?.username }}</span>
          </el-tooltip>
        </div>
        <el-dropdown>
          <el-icon class="user-info-dropdown">
            <CaretBottom />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="doLoginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { Sunny, MoonNight, CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { util } from '@/shared'
import config from '../../../config'
import { setTheme } from '@/themes'
import { loginOut } from '@/services/login'
import { useRouter } from 'vue-router'

interface ThemeItem {
  text: string
  value: string
}

interface State {
  theme: {
    value: string
    list: ThemeItem[]
  }
  userInfo: {
    username: string,
    image: string
  }
}

const state: State = reactive({
  theme: {
    value: '',
    list: [
      {
        text: '暗黑',
        value: 'dark',
      },
      {
        text: '明亮',
        value: 'light',
      },
    ],
  },
  userInfo: {
    username: '未登录',
    image: '',
  },
})

const themeDark = computed<boolean>(() => state.theme.value !== 'dark')
const router = useRouter()

function changeTheme(openDark: boolean) {
  state.theme.value = openDark ? 'light': 'dark'
  setTheme(state.theme.value)
  util.setStorage('theme', state.theme.value)
}

function doLoginOut() {
  loginOut().finally(() => {
    ElMessage.success('退出登录')
    router.push({
      path: '/login',
    })
  })
}

onMounted(() => {
  const queryTheme = util.getUrlQuery('theme')
  const theme = util.getStorage('theme') ?? 'dark'
  state.theme.value = theme
  if (queryTheme) state.theme.value = queryTheme
  const userInfo = util.getStorage('userInfo')
  state.userInfo.username = userInfo?.userName
})
</script>

<style scoped lang="scss">
@use '@/styles/common';

.container {
  width: 100%;
  height: 100%;
  @include common.flex(space-between);
  .logo {
    height: 100%;
    @include common.font(
      20px,
      null,
      bold,
      null,
      MicrosoftYaHei,
      6px 6px 6px var(--el-color-info-light-5)
    );
    @include common.flex;
  }
  .header-right-container {
    @include common.flex;
  }
  .user-container {
    @include common.flex;
    padding: 0 16px;
    .user-info {
      @include common.flex(center, flex-start, column);
      margin-left: 8px;
      font-size: 14px;
      @include common.font(14px);
      margin-right: 6px;
      .user-text {
        max-width: 300px;
        @include common.overflowEllipsis;
      }
    }
    .user-info-dropdown {
      cursor: pointer;
    }
  }
}
</style>
