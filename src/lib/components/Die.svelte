<svelte:options immutable={true} />

<script lang="ts">
	export let className = '';
	export let face: 0 | 1 | 2 | 3 | 4 | 5 | 6;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 38 38"
	class={className}
>
	<title>{face}</title>
	<rect
		x="1"
		y="1"
		width="36"
		height="36"
		rx="5"
		ry="5"
		fill="white"
		stroke="currentColor"
		stroke-width="2"
	/>
	{#if face > 1}
		<circle cx="8.5" cy="8.5" r="3.5" />
	{/if}
	{#if face >= 4}
		<circle cx="29" cy="8.5" r="3.5" />
	{/if}
	{#if face >= 6}
		<circle cx="8.5" cy="19" r="3.5" />
	{/if}
	{#if face === 1 || face === 3 || face === 5}
		<circle cx="19" cy="19" r="3.5" />
	{/if}
	{#if face >= 6}
		<circle cx="29" cy="19" r="3.5" />
	{/if}
	{#if face >= 4}
		<circle cx="8.5" cy="29" r="3.5" />
	{/if}
	{#if face > 1}
		<circle cx="29" cy="29" r="3.5" />
	{/if}
</svg>

<style>
	svg {
		fill: currentColor;
		display: block;
	}
</style>
