<script lang="ts" context="module">
	export type ThemeName = 'red' | 'blue' | 'green' | 'gray';
</script>

<script lang="ts">
	export let selected: ThemeName;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		disabled={selected !== 'red' || undefined}
		href="/css/red.css"
		title="Fiasco Red"
	/>
	<link
		rel="alternate stylesheet"
		disabled={selected !== 'blue' || undefined}
		href="/css/blue.css"
		title="Companion Blue"
	/>
	<link
		rel="alternate stylesheet"
		disabled={selected !== 'green' || undefined}
		href="/css/green.css"
		title="Town Green"
	/>
	<link
		rel="alternate stylesheet"
		disabled={selected !== 'gray' || undefined}
		href="/css/gray.css"
		title="Plain Gray"
	/>
</svelte:head>
