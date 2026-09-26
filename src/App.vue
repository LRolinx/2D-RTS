<template>
  <div class="rts-shell">
    <header class="top-bar">
      <div>
        <p class="eyebrow">HYBRID STRATEGY SIM</p>
        <h1>2D RTS</h1>
      </div>
      <div class="status-panel" aria-label="game controls">
        <span>框选编队</span>
        <span>右键移动</span>
        <span>滚轮缩放</span>
        <span>点按命令</span>
        <span>Home 回基地</span>
        <span>Ctrl+1-9 编队</span>
        <span>K/L/,/. 海军</span>
        <span>[ 船厂</span>
        <span>4-6 科技</span>
        <span>战术 AI</span>
      </div>
    </header>
    <div ref="stageRef" class="game-stage" aria-label="2D RTS simulation canvas">
      <div v-show="isLoading" class="loading">正在部署战场...</div>
      <div v-if="loadError" class="load-error" role="alert">
        <strong>战场部署失败</strong>
        <span>{{ loadError }}</span>
        <button type="button" @click="reloadGame">重新部署</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { PixiRts } from './examples/Rts/pixiRts'

const stageRef = ref<HTMLElement>()
const isLoading = ref(true)
const loadError = ref('')
let game: PixiRts | undefined
let disposed = false

const loadGame = async () => {
  if (!stageRef.value) return
  isLoading.value = true
  loadError.value = ''
  try {
    const { PixiRts } = await import('./examples/Rts/pixiRts')
    if (disposed || !stageRef.value) return
    game?.destroy()
    game = new PixiRts(stageRef.value)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    loadError.value = error instanceof Error ? error.message : '未知错误'
  }
}

const reloadGame = () => {
  void loadGame()
}

onMounted(() => {
  void loadGame()
})

onBeforeUnmount(() => {
  disposed = true
  game?.destroy()
  game = undefined
})
</script>


<style scoped>
.rts-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background:
    radial-gradient(circle at 22% 18%, rgba(73, 108, 255, 0.18), transparent 28rem),
    linear-gradient(135deg, #11151d 0%, #171b25 48%, #202333 100%);
  color: #f2f5ff;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 13, 20, 0.72);
  backdrop-filter: blur(12px);
}

.eyebrow {
  margin: 0 0 4px;
  color: #8aa1ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
}

h1 {
  margin: 0;
  font-size: 28px;
  line-height: 1;
}

.status-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  font-size: 13px;
  color: #cfd7ff;
}

.status-panel span {
  border: 1px solid rgba(138, 161, 255, 0.32);
  border-radius: 6px;
  padding: 6px 10px;
  background: rgba(28, 34, 52, 0.7);
}

.game-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.game-stage :deep(canvas) {
  display: block;
}

.loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #9faaff;
  font-size: 14px;
}

.load-error {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 10px;
  padding: 24px;
  color: #ffd7d7;
  text-align: center;
  background: rgba(10, 13, 20, 0.86);
}

.load-error span {
  max-width: 560px;
  color: #f3b8b8;
  font-size: 13px;
}

.load-error button {
  border-color: rgba(138, 161, 255, 0.55);
  color: #f2f5ff;
  background: #1c2234;
}

@media (max-width: 720px) {
  .top-bar {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .status-panel {
    justify-content: flex-start;
  }
}
</style>
