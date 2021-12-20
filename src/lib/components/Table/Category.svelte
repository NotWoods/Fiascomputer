<script lang="ts">
	import type { PlaysetTable } from '$lib/playset';
	import Editable from '$lib/components/Editable.svelte';
	import { bindDispatch, getStoreContext } from '$lib/store';
	import { changeCard, renameCategory, renameElement } from '$lib/actions';
	import type { TableIndex } from '$lib/storage/playset';
	import type { CardType } from '../FiascoCard/card-type';

	export let tableType: CardType;
	export let category: TableIndex;
	export let table: PlaysetTable;
	export let pairIndex: number | undefined = undefined;

	$: categoryData = table.categories[category];

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

<li class="category" value={category + 1}>
	<h3 class="category-name font-hitchcock">
		<Editable
			tag="a"
			href="../setup"
			class="category-link"
			value={categoryData.name}
			onClick={() => changeCardDetails()}
			onChange={(text) => changeCategory(tableType, category, text)}
		/>
	</h3>
	<ol class="elements">
		{#each categoryData.elements as elementData, element}
			<li class="element-name font-sans" value={element + 1}>
				<img
					class="die"
					src="/die/{element + 1}.svg"
					alt={(element + 1).toString()}
					width="16"
					height="16"
				/>
				<Editable
					tag="a"
					href="../setup"
					class="element-link"
					value={elementData}
					onClick={() => changeCardDetails(element)}
					onChange={(text) => changeElement(tableType, category, element, text)}
				/>
			</li>
		{/each}
	</ol>
</li>

<style>
	.die {
		display: inline-block;
		vertical-align: sub;
		margin-right: 0.5rem;
	}
</style>
