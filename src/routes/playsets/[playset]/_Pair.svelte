<script lang="ts">
	import { changeDetailType, clearDetailType } from '$lib/actions';

	import { cardName, DetailType, detailTypes } from '$lib/components/FiascoCard/card-colors';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';
	import { cardDetailsTableDefined } from '$lib/deck';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let pairIndex: number;
	export let playerIndex: number | undefined = undefined;
	export let editable = false;

	$: pair = $session.pairs[pairIndex];

	function setDetail(type: DetailType) {
		session.dispatch(changeDetailType(type, pairIndex));
	}

	function removeDetail() {
		session.dispatch(clearDetailType(pairIndex));
	}
</script>

<div id="pair-{pairIndex + 1}" class="pair">
	<SelectCard cardDetails={pair.relationship} {pairIndex} {playerIndex} {editable} />
	{#if cardDetailsTableDefined(pair.detail)}
		<SelectCard
			cardDetails={pair.detail}
			{pairIndex}
			{playerIndex}
			{editable}
			onRemove={editable ? removeDetail : undefined}
		/>
	{:else}
		<div class="item detail" data-detail>
			{#if editable}
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
			{/if}
		</div>
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
