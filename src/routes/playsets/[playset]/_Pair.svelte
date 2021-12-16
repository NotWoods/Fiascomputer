<script lang="ts">
	import { cardName, DetailType, detailTypes } from '$lib/components/FiascoCard/card-colors';

	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';
  import type { Playset } from '$lib/playset';

  export let playset: Playset;
	export let pairNumber: number;

	let detail: DetailType | undefined = undefined;
</script>

<div id={`pair-${pairNumber}`} class="pair">
	<SelectCard {playset} type="relationship" />
	{#if detail === undefined}
		<div class="item detail" data-detail>
			<div class="unspecified-detail">
				{#each detailTypes as detailItem}
					<button
						class={`detail-control ${detailItem}-control`}
						on:click={() => {
							detail = detailItem;
						}}
					>
						{cardName(detailItem)}
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<SelectCard {playset} type={detail} />
	{/if}
</div>
