<script lang="ts" context="module">
	import { loadBundledEngine } from '$lib/storage/engine';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { castIndex } from '../[card]/_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const engine = await loadBundledEngine('normal', fetch);
		const outcomeType = page.query.get('outcome') ?? undefined;
		return {
			props: {
				outcomeType,
				engine,
				category: castIndex(page.params.category, Infinity)
			}
		};
	};
</script>

<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import Title from '$lib/components/Title.svelte';
	import { getStoreContext } from '$lib/store';
	import type { Engine } from '$lib/storage/engine';
	import TiltCategory from '$lib/components/Table/TiltCategory.svelte';
	import type { OutcomeType } from '$lib/outcome';
	import type { TableIndex } from '$lib/playset';

	const { playset } = getStoreContext();

	export let engine: Engine;
	export let category: TableIndex;
	export let outcomeType: OutcomeType | undefined = undefined;

	$: table = engine.tilt!;
</script>

<Title text="Tilt" playsetTitle={$playset.title} />

<div id="table" class="page table-page">
	<Table subtitle={undefined} {table} cardType="tilt">
		<TiltCategory {table} {category} {outcomeType} />
	</Table>
</div>
