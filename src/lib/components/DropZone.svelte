<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		drop: string;
	}>();

	export let accept: string;

	let dragOver = false;

	/**
	 * Indicate that drops are accepted if they have a certain mime type.
	 * @param event
	 */
	function handleDragOver(event: DragEvent & { currentTarget: HTMLElement }) {
		if (event.dataTransfer?.types.includes(accept)) {
			event.preventDefault();
			dragOver = true;
		}
	}

	function handleDrop(event: DragEvent) {
		dragOver = false;
		const data = event.dataTransfer?.getData(accept);
		if (!data) return;

		dispatch('drop', data);
	}
</script>

<div
	class="dropzone"
	class:dragover={dragOver}
	on:drop={handleDrop}
	on:dragover={handleDragOver}
	on:dragleave={() => (dragOver = false)}
>
	<slot />
</div>

<style>
	.dropzone {
		transition: outline 0.1s ease-in;
		outline: 0.2em dashed transparent;
		outline-offset: 0.25em;
	}
	.dropzone.dragover {
		outline-color: var(--heading-color);
	}
</style>
