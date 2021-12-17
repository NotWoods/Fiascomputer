<script lang="ts" context="module">
	import { cardName, CardType } from '$lib/components/FiascoCard/card-type';
	import { getTable, PlaysetData } from '$lib/playset';
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';
	import { parseProps } from './_parse-props';

	export const load: import('@sveltejs/kit').Load = async (input) => {
		const { page } = input;
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {
			props: await parseProps(input)
		};
	};
</script>

<script lang="ts">
	import Categories from '$lib/components/Table/Categories.svelte';
	import Table from '$lib/components/Table/Table.svelte';

	export let tableType: CardType;
	export let playset: PlaysetData;
	export let pairIndex: number | undefined = undefined;

	$: table = getTable(playset, tableType);
</script>

<svelte:head>
	<title>{cardName(tableType)} | {playset.title} | Fiascomputer</title>
</svelte:head>

<div id="table" class="page table-page">
	<Table subtitle={playset.subtitle} {table} cardType={tableType}>
		<Categories {tableType} {table} {pairIndex} />
	</Table>
</div>
