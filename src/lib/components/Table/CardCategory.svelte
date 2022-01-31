<script lang="ts">
	import { goto } from '$app/navigation';
	import { changeCard, renameCategory, renameElement } from '$lib/actions';
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import { selectedCardDetails } from '$lib/storage/session';
	import { getStoreContext } from '$lib/store';
	import type { CardType } from '../FiascoCard/card-type';
	import Category from './Category.svelte';

	export let tableType: CardType;
	export let category: TableIndex;
	export let table: PlaysetTable;
	export let pairIndex: number | undefined = undefined;
	export let editable = false;

	const { playset, session } = getStoreContext();

	$: selected = selectedCardDetails($session, pairIndex, tableType);

	async function selectCard(event: CustomEvent<{ element: number }>) {
		if (pairIndex == undefined) return;

		await session.dispatch(
			changeCard(tableType, pairIndex, { category, element: event.detail.element as TableIndex })
		);

		goto('../setup');
	}

	function renameCard(event: CustomEvent<{ text: string; element?: number }>) {
		const { text, element } = event.detail;
		if (element != undefined) {
			playset.dispatch(renameElement(tableType, category, element, text));
		} else {
			playset.dispatch(renameCategory(tableType, category, text));
		}
	}
</script>

<Category {category} {table} {selected} {editable} on:select={selectCard} on:rename={renameCard} />
