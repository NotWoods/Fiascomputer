<script lang="ts">
	import { changeTilt } from '$lib/actions';
	import type { OutcomeType } from '$lib/outcome';
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import { getStoreContext } from '$lib/store';
	import Category from './Category.svelte';

	export let category: TableIndex;
	export let table: PlaysetTable;
	export let outcomeType: OutcomeType | undefined;

	const { session } = getStoreContext();

	function changeCardDetails(element?: number) {
		if (!outcomeType) return;

		session.dispatch(
			changeTilt(outcomeType, { category, element: element as TableIndex | undefined })
		);
	}
</script>

<Category {category} {table} onClick={changeCardDetails} />
