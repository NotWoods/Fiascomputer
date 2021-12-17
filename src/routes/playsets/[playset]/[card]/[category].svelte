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

		const { playset, tableType, pairIndex } = await parseProps(input);
		return {
			props: {
				playset,
				tableType,
				pairIndex,
				category: castIndex(page.params.category, playset.tables[tableType].categories.length)
			}
		};
	};
</script>

<script lang="ts">
	import type { PlaysetData, TableIndex } from '$lib/playset';
	import type { CardType } from '$lib/components/FiascoCard/card-type';
	import Category from '$lib/components/Table/Category.svelte';
	import Table from '$lib/components/Table/Table.svelte';

	export let tableType: CardType;
	export let category: TableIndex;
	export let playset: PlaysetData;
	export let pairIndex: number | undefined = undefined;

	$: console.log(tableType, category, playset, pairIndex)

	$: table = getTable(playset, tableType);
</script>

<svelte:head>
	<title>{cardName(tableType)} | {playset.title} | Fiascomputer</title>
</svelte:head>

<div id="table" class="page table-page">
	<Table subtitle={playset.subtitle} {table}>
		<Category {tableType} {table} {category} {pairIndex} />
	</Table>
</div>
