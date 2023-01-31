<script setup lang="ts">
import { useLifecycleLogger } from "@/hooks/lifecycleLogger";


useLifecycleLogger({ name: "AppLayoutLogin" });
</script>

<template>
	<div>

		<main class="">
			<div>AppLayoutLogin</div>
			<div class="">
				<slot />
			</div>
		</main>
	</div>
</template>
