<script lang="ts">
	import { changeDetailType, clearDetailType, changeCard } from '$lib/actions';
	import DropZone from '$lib/components/DropZone.svelte';

	import {
		cardColors,
		cardName,
		DetailType,
		detailTypes
	} from '$lib/components/FiascoCard/card-colors';
	import Item from '$lib/components/FiascoCard/Item.svelte';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';
	import { CardDetails, cardDetailsTableDefined } from '$lib/deck';
	import { getStoreContext } from '$lib/store';

	const { session } = getStoreContext();

	export let pairIndex: number;
	export let activePlayers: number;
	export let editable = false;

	$: pair = $session.pairs[pairIndex];
	$: pairPlayer1 = pairIndex + 1;
	$: pairPlayer2 = pairIndex + 2 > activePlayers ? 1 : pairIndex + 2;

	function resetRelationship() {
		if (!editable) return;
		session.dispatch(
			changeCard('relationship', pairIndex, {
				category: undefined,
				element: undefined
			})
		);
	}

	function setDetail(type: DetailType) {
		session.dispatch(changeDetailType(type, pairIndex));
	}

	function removeDetail() {
		if (!editable) return;
		session.dispatch(clearDetailType(pairIndex));
	}

	function handleDrop(event: CustomEvent<string>) {
		const cardDetails = JSON.parse(event.detail) as CardDetails;
		session.dispatch(changeCard(cardDetails.table, pairIndex, cardDetails));
	}
</script>

<div id="pair-{pairIndex + 1}" class="pair">
	<h3 class="sr-only">Between Player {pairPlayer1} and Player {pairPlayer2}</h3>
	<DropZone accept="application/x-fiasco-card-relationship" on:drop={handleDrop}>
		<SelectCard
			cardDetails={pair.relationship}
			{pairIndex}
			{editable}
			on:remove={resetRelationship}
		/>
	</DropZone>
	<DropZone accept="application/x-fiasco-card-detail" on:drop={handleDrop}>
		{#if cardDetailsTableDefined(pair.detail)}
			<SelectCard cardDetails={pair.detail} {pairIndex} {editable} on:remove={removeDetail} />
		{:else}
			<Item class="detail">
				{#if editable}
					<div class="unspecified-detail">
						{#each detailTypes as detailItem}
							<button
								class="detail-control ${detailItem}-control"
								style="background-color: {cardColors[detailItem].top}"
								on:click={() => setDetail(detailItem)}
							>
								{cardName(detailItem)}
							</button>
						{/each}
					</div>
				{/if}
			</Item>
		{/if}
	</DropZone>
</div>

<style lang="scss">
	@use '../../../../css/defs';

	.pair > :global(.dropzone) {
		margin-bottom: 1rem;
	}

	.unspecified-detail {
		@include defs.flex(column, $horizontal: stretch, $vertical-spacing: 1rem);

		.detail-control {
			flex: 1;
			@include defs.plain-button;
			@include defs.button;
			padding: 0.5rem;
		}
	}
</style>
