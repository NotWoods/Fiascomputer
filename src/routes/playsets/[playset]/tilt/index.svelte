<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToAlwaysTrailingSlash } from '$lib/trailing-slash';
	import { parseProps } from '../[card]/_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (!hasTrailingSlash(page)) {
			return redirectToAlwaysTrailingSlash(page);
		}

		const engine = await loadBundledEngine('normal', fetch);
		const outcomeType = page.query.get('outcome') ?? undefined;
		return {
			props: {
				outcomeType,
				engine
			}
		};
	};
</script>

<script lang="ts">
	import Categories from '$lib/components/Table/Categories.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Title from '$lib/components/Title.svelte';
	import { getStoreContext } from '$lib/store';
	import { Engine, loadBundledEngine } from '$lib/storage/engine';
	import TiltCategory from '$lib/components/Table/TiltCategory.svelte';
	import type { OutcomeType } from '$lib/outcome';

	const { playset } = getStoreContext();

	export let engine: Engine;
	export let outcomeType: OutcomeType | undefined = undefined;

	$: table = engine.tilt!;
</script>

<Title text="Tilt" playsetTitle={$playset.title} />

<div id="table" class="page table-page">
	<Table subtitle={undefined} {table} cardType="tilt">
		<Categories {table} let:category>
			<TiltCategory {table} {category} {outcomeType} />
		</Categories>
	</Table>
</div>
