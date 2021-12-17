<script lang="ts">
	import type { PlaysetTable, TableIndex } from '$lib/playset';
	import type { CardType } from '../FiascoCard/card-type';
	import Category from './Category.svelte';

	export let tableType: CardType;
	export let table: PlaysetTable;
	export let pairIndex: number | undefined = undefined;

	function castTableIndex(index: number) {
		return index as TableIndex;
	}
</script>

<ol class="categories">
	{#each table.categories as _, category}
		<Category {tableType} {table} category={castTableIndex(category)} {pairIndex} />
	{/each}
</ol>
