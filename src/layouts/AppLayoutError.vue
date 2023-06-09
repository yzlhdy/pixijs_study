<script setup lang="ts">
import { useLifecycleLogger } from '@/hooks/lifecycleLogger'

useLifecycleLogger({ name: 'AppLayoutError' })
</script>

<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>
