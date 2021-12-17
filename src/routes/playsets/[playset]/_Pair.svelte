<script lang="ts">
	import { changeDetailType, clearDetailType } from '$lib/actions';

	import { cardName, DetailType, detailTypes } from '$lib/components/FiascoCard/card-colors';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';
	import type { PlaysetData } from '$lib/playset';
	import { sessionStore } from '$lib/store';

	export let playset: PlaysetData;
	export let pairIndex: number;

	$: pair = $sessionStore.pairs[pairIndex];

	function setDetail(type: DetailType) {
		sessionStore.dispatch(changeDetailType(type, pairIndex));
	}

	function removeDetail() {
		sessionStore.dispatch(clearDetailType(pairIndex));
	}
</script>

<div id={`pair-${pairIndex + 1}`} class="pair">
	<SelectCard {playset} cardDetails={pair.relationship} {pairIndex} />
	{#if pair.detail.table === undefined}
		<div class="item detail" data-detail>
			<div class="unspecified-detail">
				{#each detailTypes as detailItem}
					<button
						class={`detail-control ${detailItem}-control`}
						on:click={() => setDetail(detailItem)}
					>
						{cardName(detailItem)}
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<SelectCard
			{playset}
			cardDetails={pair.detail}
			{pairIndex}
			onRemove={removeDetail}
		/>
	{/if}
</div>

<style>
	.need-control {
		background-color: #f47541 !important;
	}
	.location-control {
		background-color: #39ae68 !important;
	}
	.object-control {
		background-color: #51908e !important;
	}
</style>
