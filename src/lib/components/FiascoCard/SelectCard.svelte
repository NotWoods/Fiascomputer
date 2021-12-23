<script lang="ts">
	import { changeCard } from '$lib/actions';

	import { getTable } from '$lib/playset';
	import type { CardDetails } from '$lib/storage/session';
	import { getStoreContext } from '$lib/store';
	import { cardColors, cardName, icons } from './card-colors';
	import CardRow, { type DescriptionType } from './_CardRow.svelte';

	const { playset, session } = getStoreContext();

	export let cardDetails: CardDetails;
	export let pairIndex: number;
	export let playerIndex: number | undefined = undefined;
	export let editable = false;
	export let onRemove: (() => void) | undefined = undefined;

	$: type = cardDetails.table;
	$: colors = cardColors[type];
	$: categories = getTable($playset, type).categories;

	$: cardRowLink = (descriptionType: DescriptionType) => {
		if (!editable) {
			return undefined;
		} else if (playerIndex != undefined) {
			return `./hand?player=${playerIndex}&pair=${pairIndex}`;
		} else {
			const category = descriptionType === 'category' ? undefined : cardDetails.category;
			let link = `./${cardDetails.table}/${category || ''}`;
			if (editable) {
				link = `${link}?pair=${pairIndex}`;
			}
			return link;
		}
	};

	function resetCardDetails(descriptionType: DescriptionType) {
		session.dispatch(
			changeCard(cardDetails.table, pairIndex, {
				category: descriptionType === 'category' ? undefined : cardDetails.category,
				element: undefined
			})
		);
	}
</script>

<div class="item {type}">
	<h3 aria-label={cardName(type)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 786 187"
			class="card-graphic"
			aria-hidden="true"
		>
			<path fill={colors.top} d="M0 0v186l788-71V0H0Z" />
			<path fill="#fff" d={icons[type]} />
			<text class="card-heading font-hitchcock" x="190" y="120">{cardName(type)}</text>
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
		href={cardRowLink('category')}
		onRemove={resetCardDetails}
	/>
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="element"
		{editable}
		href={cardRowLink('element')}
		onRemove={resetCardDetails}
	/>
</div>

<style>
	.item {
		position: relative;
	}
	.card-graphic {
		margin: -1em;
		margin-bottom: 0;
	}
	.card-heading {
		fill: white;
		transform: rotateZ(-4deg);
		font-size: 300%;
	}
	.detail-remove {
		margin: 1rem;
	}
</style>
