<script lang="ts" context="module">
	import { assertInSet, cardName, CardType, cardTypes } from '$lib/components/FiascoCard/card-type';
	import { getTable, loadBundledPlayset, PlaysetData } from '$lib/playset';
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		const { card } = page.params;
		assertInSet(card, cardTypes);

		return {
			props: {
				type: card,
				playset: await loadBundledPlayset(page.params.playset, fetch)
			}
		};
	};
</script>

<script lang="ts">
  import Categories from "$lib/components/Table/Categories.svelte";
  import Table from "$lib/components/Table/Table.svelte";

	export let type: CardType;
  export let playset: PlaysetData;

  $: table = getTable(playset, type)
</script>

<svelte:head>
	<title>{cardName(type)} | {playset.title} | Fiascomputer</title>
</svelte:head>

<div id="table" class="page table-page">
  <Table subtitle={playset.subtitle} {table}>
    <Categories {table} />
  </Table>
</div>
