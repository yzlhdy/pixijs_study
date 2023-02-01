<template>
	<div class="px-4 py-10 text-center ">
		<button class="icon-btn mx-2 shadow !outline-none bg-green border-none px-4 py-2 rounded-1 cursor-pointer"
			title="123" @click="toggleDark()">
			切换
		</button>
		<p class=" text-primary">123</p>
		<Icon icon="ci:cookie" />
		<Icon icon="flag:ac-4x3" />
		<Icon icon="logos:telegram" />
	</div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { toggleDark } from '@/composables/dark'

</script>

<style scoped>

</style>
