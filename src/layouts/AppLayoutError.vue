<script setup lang="ts">
import { useLifecycleLogger } from "@/hooks/lifecycleLogger";

useLifecycleLogger({ name: "AppLayoutError" });
</script>

<template>
	<div>
		<main>
			<div>AppLayoutError</div>
			<slot />
		</main>
	</div>
</template>
