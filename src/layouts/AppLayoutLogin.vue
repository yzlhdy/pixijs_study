<script setup lang="ts">
import { useLifecycleLogger } from '@/hooks/lifecycleLogger'

useLifecycleLogger({ name: 'AppLayoutLogin' })
</script>

<template>
  <div>
    <main class="flex justify-center min-h-screen min-w-screen">
      <slot />
    </main>
  </div>
</template>
