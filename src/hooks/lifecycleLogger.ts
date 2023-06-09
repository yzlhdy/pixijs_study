import { onMounted, onUnmounted } from 'vue'

export function useLifecycleLogger(payload: { name: string }) {
  onMounted(() => {
    console.log(payload.name, '进入')
  })

  onUnmounted(() => {
    console.log(payload.name, '销毁')
  })
}
