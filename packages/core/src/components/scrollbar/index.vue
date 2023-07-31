<template>
  <div class="scrollbar-container" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { computed, CSSProperties } from 'vue'
  import { useThemeInfo } from '@/hooks'

  interface Props {
    scrollX?: boolean
    scrollY?: boolean
    width?: number | string
    color?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    scrollX: true,
    scrollY: true,
  })
  const themeInfo = useThemeInfo()
  const style = computed<CSSProperties>(()=>{
    const styles: CSSProperties = {
      '--scrollbar-color': props.color ? props.color : themeInfo.styles['el-text-color-secondary'] + '3D',
    };

    styles.overflowX = props.scrollX ? 'auto' : 'hidden'
    styles.overflowY = props.scrollY ? 'auto' : 'hidden'
    if (props.width) styles.width = props.width + 'px'
    return styles
  })

</script>
<style scoped lang="scss">
  .scrollbar-container {
    flex-shrink: 0;
    box-sizing: border-box;
    max-width: 100%;
    &::-webkit-scrollbar {
      width: 0px;
    }
    
    &:hover {
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: var(--scrollbar-color);
      }
      scrollbar-width: none;
    }
  }
</style>