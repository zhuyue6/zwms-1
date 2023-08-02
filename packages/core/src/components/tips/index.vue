<template>
  <el-tooltip :content="content">
    <el-icon
      class="tip-container"
      :color="themeInfo?.styles?.['el-color-primary-base']"
    >
      <QuestionFilled />
    </el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useThemeInfo } from '@zwms/hooks'
import { QuestionFilled } from '@element-plus/icons-vue'
interface Props {
  content: string | undefined
}
const themeInfo = useThemeInfo()
defineProps<Props>()
</script>
<style scoped lang="scss">
.tip-container {
  margin: 0 6px;
}
</style>
