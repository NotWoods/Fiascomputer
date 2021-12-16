<script lang="ts" context="module">
	import { assertInSet, cardName, CardType, cardTypes } from '$lib/components/FiascoCard/card-type';
	import { getTable, loadBundledPlayset, PlaysetData } from '$lib/playset';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const playset = await loadBundledPlayset(page.params.playset, fetch);

		const { card } = page.params;
		assertInSet(card, cardTypes);

		const category = Number(page.params.category);
		const { categories } = playset.tables[card];
		if (Number.isNaN(category) || category < 0 || category >= categories.length) {
			throw new Error(`Invalid category ${category}`);
		}

		return {
			props: {
				type: card,
				category,
				playset
			}
		};
	};
</script>

<script lang="ts">
	import Category from '$lib/components/Table/Category.svelte';
	import Table from '$lib/components/Table/Table.svelte';

	export let type: CardType;
	export let category: number;
	export let playset: PlaysetData;

	$: table = getTable(playset, type)
</script>

<svelte:head>
	<title>{cardName(type)} | {playset.title} | Fiascomputer</title>
</svelte:head>

<div id="table" class="page table-page">
  <Table subtitle={playset.subtitle} {table}>
    <Category {table} {category} />
  </Table>
</div>
