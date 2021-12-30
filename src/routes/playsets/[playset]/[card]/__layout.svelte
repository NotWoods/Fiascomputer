<script lang="ts" context="module">
	import { parseProps } from './_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		const { tableType } = await parseProps(page);
		return {
			props: {
				tableType
			}
		};
	};
</script>

<script lang="ts">
	import type { CardType } from '$lib/components/FiascoCard/card-type';
	import Title from '$lib/components/Title.svelte';
	import { getStoreContext } from '$lib/store';
	import { cardName } from '$lib/components/FiascoCard/card-type';

	const { playset } = getStoreContext();

	export let tableType: CardType;
</script>

<Title text={cardName(tableType)} playsetTitle={$playset.title} />

<div id="table" class="page table-page">
	<slot />
</div>
