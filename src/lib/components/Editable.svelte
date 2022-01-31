<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { value: string } }>();

	export let value: string;
	export let editable = true;
	export let multiline = 0;
	let className = '';
	export { className as class };

	function handleChange(event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) {
		dispatch('change', { value: event.currentTarget.value });
	}
</script>

{#if multiline > 0}
	<textarea
		class="editable {className}"
		rows={multiline}
		{value}
		disabled={!editable}
		on:change={handleChange}
	/>
{:else}
	<input class="editable {className}" {value} disabled={!editable} on:change={handleChange} />
{/if}

<style lang="scss">
	@use '../../css/defs';

	.editable {
		font: inherit;
		color: inherit;
		background: transparent;
		border: 0;
		text-align: center;
		max-width: 100%;
		transition: outline 0.1s ease-in;
		outline: 0.15em dashed transparent;
		outline-offset: 0.25em;
		scrollbar-color: var(--dark-background-color) var(--background-color);
	}
	.editable:disabled {
		cursor: inherit;
	}
	.editable:not(:disabled):hover {
		outline-color: currentColor;
	}
	.editable:focus {
		outline-color: currentColor;
		outline-width: 0.2em;
	}
</style>
