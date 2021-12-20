<script lang="ts" context="module">
	import { cardName } from '$lib/components/FiascoCard/card-type';
	import { getTable } from '$lib/playset';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { castIndex, parseProps } from './_parse-props';

	export const load: import('@sveltejs/kit').Load = async (input) => {
		const { page } = input;
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const { tableType, pairIndex } = await parseProps(input);
		return {
			props: {
				tableType,
				pairIndex,
				category: castIndex(page.params.category, Infinity)
			}
		};
	};
</script>

<script lang="ts">
	import type { TableIndex } from '$lib/playset';
	import type { CardType } from '$lib/components/FiascoCard/card-type';
	import Category from '$lib/components/Table/Category.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Title from '$lib/components/Title.svelte';
	import { getStoreContext } from '$lib/store';

	const { playset } = getStoreContext();

	export let tableType: CardType;
	export let category: TableIndex;
	export let pairIndex: number | undefined = undefined;

	$: console.log(tableType, category, playset, pairIndex);

	$: table = getTable($playset, tableType);
</script>

<Title text={cardName(tableType)} playsetTitle={$playset.title} />

<div id="table" class="page table-page">
	<Table subtitle={$playset.subtitle} {table} cardType={tableType}>
		<Category {tableType} {table} {category} {pairIndex} />
	</Table>
</div>
