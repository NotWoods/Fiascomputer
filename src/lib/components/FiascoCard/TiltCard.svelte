<script lang="ts">
	import { changeTilt } from '$lib/actions';
	import type { OutcomeType } from '$lib/outcome';
	import type { Engine } from '$lib/storage/engine';
	import { getStoreContext } from '$lib/store';
	import { cardColors } from './card-colors';
	import BaseCard from './_BaseCard.svelte';
	import type { DescriptionType } from './_CardRow.svelte';

	const { session } = getStoreContext();

	export let engine: Engine | undefined;
	export let outcomeType: OutcomeType;
	export let editable = false;

	$: colors = cardColors[outcomeType];
	$: categories = engine?.tilt?.categories ?? [];
	$: cardDetails = $session.tilts[outcomeType];

	$: buildHref = (descriptionType: DescriptionType) => {
		const category =
			descriptionType === 'element' && cardDetails.category != undefined
				? cardDetails.category
				: '';
		return `./tilt/${category}?outcome=${outcomeType}`;
	};

	function resetCard() {
		session.dispatch(
			changeTilt(outcomeType, {
				category: undefined,
				element: undefined
			})
		);
	}
</script>

<BaseCard label="Tilt" {cardDetails} {categories} {editable} {buildHref} on:remove={resetCard}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 786 187"
		class="card-graphic"
		aria-hidden="true"
	>
		<path fill={colors.top} d="M0 0 v115 l788 50 V0 H0 Z" />
		<text class="card-heading font-hitchcock" x="40" y="80">Tilt</text>
	</svg>
</BaseCard>

<style>
	.card-heading {
		fill: white;
		font-size: 300%;
	}
</style>
