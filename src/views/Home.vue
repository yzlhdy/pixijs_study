<template>
	<div class="px-4 py-10 text-center ">
		<button class="icon-btn mx-2 shadow !outline-none bg-green border-none px-4 py-2 rounded-1 cursor-pointer"
			title="123" @click="toggleDark()">
			切换
		</button>
	</div>
</template>
<script lang="ts" setup>
import { toggleDark } from '@/composables/dark'
const isUpdateRequestPending = ref<boolean>(true)
</script>

<style scoped>

</style>
