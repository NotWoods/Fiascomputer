<script lang="ts" context="module">
	import { getTable } from '$lib/playset';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { castIndex, parseProps } from './_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const { tableType, pairIndex } = await parseProps(page);
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
	import CardCategory from '$lib/components/Table/CardCategory.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import { getStoreContext } from '$lib/store';

	const { playset } = getStoreContext();

	export let tableType: CardType;
	export let category: TableIndex;
	export let pairIndex: number | undefined = undefined;

	$: table = getTable($playset, tableType);
</script>

<Table subtitle={$playset.subtitle} {table} cardType={tableType}>
	<CardCategory {tableType} {table} {category} {pairIndex} />
</Table>

<style lang="scss">
	@use '../../../../css/defs';

	:global(.categories) {
		@include defs.columns(1);
	}

	:global(.category-name) {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	:global(.element-name) {
		font-size: 1.5em;
	}
</style>
