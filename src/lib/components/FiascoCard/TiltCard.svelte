<script lang="ts">
	import { changeTilt } from '$lib/actions';

	import type { OutcomeType } from '$lib/outcome';
	import type { Engine } from '$lib/storage/engine';
	import { getStoreContext } from '$lib/store';
	import { cardColors } from './card-colors';
	import CardRow, { type DescriptionType } from './_CardRow.svelte';

	const { session } = getStoreContext();

	export let engine: Engine | undefined;
	export let outcomeType: OutcomeType;
	export let editable = false;
	export let onRemove: (() => void) | undefined = undefined;

	$: colors = cardColors[outcomeType];
	$: categories = engine?.tilt?.categories;
	$: cardDetails = $session.tilts[outcomeType];

	function resetCardDetails(descriptionType: DescriptionType) {
		session.dispatch(
			changeTilt(outcomeType, {
				category: descriptionType === 'category' ? undefined : cardDetails.category,
				element: undefined
			})
		);
	}
</script>

<div class="item tilt-{outcomeType}">
	<h3 aria-label="Tilt">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 786 187"
			class="card-graphic"
			aria-hidden="true"
		>
			<path fill={colors.top} d="M0 0 v115 l788 50 V0 H0 Z" />
			<text class="card-heading font-hitchcock" x="40" y="80">Tilt</text>
		</svg>
	</h3>
	{#if onRemove}
		<button
			type="reset"
			class="remove detail-remove close-button"
			on:click|preventDefault={onRemove}
		>
			<img src="/images/cross-white.svg" alt="Remove" />
		</button>
	{/if}
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="category"
		{editable}
		href="./tilt/?outcome={outcomeType}"
		onRemove={resetCardDetails}
	/>
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="element"
		{editable}
		href="./tilt/{cardDetails.category ?? ''}?outcome={outcomeType}"
		onRemove={resetCardDetails}
	/>
</div>

<style>
	.card-graphic {
		margin: -1em;
		margin-bottom: 0;
	}
	.card-heading {
		fill: white;
		font-size: 300%;
	}
	.detail-remove {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}
</style>
