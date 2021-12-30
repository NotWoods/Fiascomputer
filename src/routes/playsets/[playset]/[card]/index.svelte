<script lang="ts" context="module">
	import type { CardType } from '$lib/components/FiascoCard/card-type';
	import { getTable } from '$lib/playset';
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';
	import { parseProps } from './_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		return {
			props: await parseProps(page)
		};
	};
</script>

<script lang="ts">
	import Categories from '$lib/components/Table/Categories.svelte';
	import CardCategory from '$lib/components/Table/CardCategory.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import { getStoreContext } from '$lib/store';

	const { playset } = getStoreContext();

	export let tableType: CardType;
	export let pairIndex: number | undefined = undefined;

	$: table = getTable($playset, tableType);
</script>

<Table subtitle={$playset.subtitle} {table} cardType={tableType}>
	<Categories {table} let:category>
		<CardCategory {tableType} {table} {category} {pairIndex} />
	</Categories>
</Table>
