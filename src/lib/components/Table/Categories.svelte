<script lang="ts">
	import type { PlaysetTable, TableIndex } from '$lib/playset';

	export let table: PlaysetTable;

	function castTableIndex(index: number) {
		return index as TableIndex;
	}
</script>

<ol class="categories">
	{#each table.categories as _, category}
		<slot {table} category={castTableIndex(category)} />
	{/each}
</ol>
