<script lang="ts">
	import { changeTilt } from '$lib/actions';
	import type { OutcomeType } from '$lib/outcome';
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import { selectedTiltDetails } from '$lib/storage/session';
	import { getStoreContext } from '$lib/store';
	import Category from './Category.svelte';

	const { session } = getStoreContext();

	export let category: TableIndex;
	export let table: PlaysetTable;
	export let outcomeType: OutcomeType | undefined;
	export let editable = false;

	$: selected = selectedTiltDetails($session, outcomeType);

	function selectTilt(event: CustomEvent<{ element: number }>) {
		if (!outcomeType) return;

		session.dispatch(
			changeTilt(outcomeType, { category, element: event.detail.element as TableIndex })
		);
	}
</script>

<Category {category} {table} {selected} {editable} on:select={selectTilt} />
