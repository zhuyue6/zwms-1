<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useListenWindowOnresize } from '@/hooks'
import { Chart } from '@antv/g2'
import { useThemeInfo } from '@/hooks'
// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]

// 初始化图表实例
let chart: Chart

const chartRef = ref<HTMLDivElement | null>(null)

const themeInfo = useThemeInfo()

watchEffect(() => {
  const themeType = themeInfo.colorScheme === 'dark' ? 'classicDark' : 'classic'
  if (!chart) return
  chart.theme({ type: themeType })
  render()
})

function render() {
  if (!chart) return
  // 渲染可视化
  chart.render()
}

onMounted(() => {
  chart = new Chart({
    container: <HTMLDivElement>chartRef.value,
    theme: 'classic',
    autoFit: true,
  })
  chart
    .interval()
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold') // 编码 y 通道
    .animate('enter', {
      type: 'growInY',
      duration: 1000, // 指定入场动画的执行时间
    })
    .animate('update', {
      type: 'growInY',
      duration: 1000, // 指定入场动画的执行时间
    })
  render()
})

useListenWindowOnresize(render)
</script>

<style lang="scss">
.chart {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
