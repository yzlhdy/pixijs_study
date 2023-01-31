<script setup lang="ts">

import { useLifecycleLogger } from "@/hooks/lifecycleLogger";

useLifecycleLogger({ name: "AppLayoutDefault" });
</script>

<template>

	<main class="">
		<div>AppLayoutDefault</div>
		<slot />
	</main>

</template>

<style lang="scss">

</style>
