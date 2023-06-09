<script lang="ts" setup>
import { initGame } from './game/game'

onMounted(() => {
  const canvas = document.getElementById('canvas')!
  initGame(canvas)
})
</script>

<template>
  <div class=" fixed top-0 left-0">
    <div id="canvas" />
  </div>
</template>

<style scoped>

</style>
