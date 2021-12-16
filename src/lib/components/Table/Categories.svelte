<script lang="ts">
	import type { PlaysetTable } from '$lib/playset';
	import Category from './Category.svelte';

	export let table: PlaysetTable;

	export let changeCategory: ((category: number, text: string) => void) | undefined = undefined;
	export let changeElement:
		| ((category: number, element: number, text: string) => void)
		| undefined = undefined;
</script>

<ol class="categories">
	{#each table.categories as _, category}
		<Category {table} {category} {changeCategory} {changeElement} />
	{/each}
</ol>
