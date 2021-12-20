<script lang="ts">
	import { changeCard, renameCategory, renameElement } from '$lib/actions';
	import type { PlaysetTable } from '$lib/playset';
	import type { TableIndex } from '$lib/storage/playset';
	import { bindDispatch, getStoreContext } from '$lib/store';
	import type { CardType } from '../FiascoCard/card-type';
	import Category from './Category.svelte';

	export let tableType: CardType;
	export let category: TableIndex;
	export let table: PlaysetTable;
	export let pairIndex: number | undefined = undefined;

	const { playset, session } = getStoreContext();
	const changeCategory = bindDispatch(playset, renameCategory);
	const changeElement = bindDispatch(playset, renameElement);

	function changeCardDetails(element?: number) {
		if (pairIndex == undefined) return;

		session.dispatch(
			changeCard(tableType, pairIndex, { category, element: element as TableIndex | undefined })
		);
	}
</script>

<Category
	{category}
	{table}
	onClick={changeCardDetails}
	onChangeCategory={(text) => changeCategory(tableType, category, text)}
	onChangeElement={(element, text) => changeElement(tableType, category, element, text)}
/>
