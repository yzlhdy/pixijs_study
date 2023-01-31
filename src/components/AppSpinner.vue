<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";


const props = defineProps<{
	to?: string;
	fullscreen?: boolean;
	shouldCatchFocus?: boolean;
}>();
type IElementClasses = Record<string, boolean | undefined | null>;

const lastActiveElement = ref<HTMLElement | null>(null);
const rootElementRef = ref<HTMLElement>();

function storeLastActiveElement() {
	lastActiveElement.value = document.activeElement as HTMLElement;
}

function catchFocus() {
	rootElementRef.value?.focus();
}

function restoreLastFocus() {
	lastActiveElement.value?.focus();
}

onMounted(() => {
	storeLastActiveElement();
	if (props.shouldCatchFocus) catchFocus();
});

onUnmounted(() => {
	restoreLastFocus();
});

const spinnerClasses = computed<IElementClasses>(() => ({
	"app-spinner--fullscreen": props.fullscreen,
}));
</script>
<template>
	<teleport v-if="props.to" :to="props.to">
		<div ref="rootElementRef" class="app-spinner" :class="spinnerClasses" tabindex="0" @focusout="catchFocus">
			<div class="app-spinner__overlay" />
			<div class="app-spinner__icon" />
		</div>
	</teleport>
	<div v-else ref="rootElementRef" class="app-spinner" :class="spinnerClasses" tabindex="0" @focusout="catchFocus">
		<div class="app-spinner__overlay" />
		<div class="app-spinner__icon" />
	</div>
</template>

<style >
.app-spinner {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	width: 100%;
	height: 100%;

}

.app-spinner:focus {
	outline: none;
}

.app-spinner__icon {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 1;
	width: 40px;
	height: 40px;
	background-repeat: no-repeat;
	background-size: contain;
	animation: spinnerAnimation 0.6s infinite linear;
	background-image: url("../assets/images/spinner-icon.svg");
}

.app-spinner__overlay {
	width: 100%;
	height: 100%;
	background-color: rgba(white, 0.7);
}

.app-spinner--fullscreen {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}

@keyframes spinnerAnimation {
	0% {
		transform: translate(-50%, -50%) rotate(0);
	}

	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}
</style>
