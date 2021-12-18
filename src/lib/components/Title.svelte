<svelte:options immutable={true} />

<script lang="ts">
	export let text: string;
	export let playsetTitle: string | undefined = undefined;
	export let homePage = false;
</script>

<svelte:head>
	{#if homePage}
		<title>Fiascomputer | Create and visualize Fiasco setups</title>
	{:else if playsetTitle != undefined}
		<title>{text} | {playsetTitle} | Fiascomputer</title>
	{:else}
		<title>{text} | Fiascomputer</title>
	{/if}
</svelte:head>
