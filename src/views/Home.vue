<template>
	<div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200 ">

		<button class="icon-btn mx-2 !outline-none" title="123" @click="toggleDark()">
			<div i="carbon-sun dark:carbon-moon" />
		</button>
	</div>
</template>
<script lang="ts" setup>
import { toggleDark } from '~/composables/dark'
</script>

<style scoped>

</style>
