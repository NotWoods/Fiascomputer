<script lang="ts">
	import { getTable } from '$lib/playset';
	import type { PlaysetData } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';
	import { cardColors, cardName, icons } from './card-colors';
	import CardRow, { DescriptionType, fallback } from './_CardRow.svelte';

	export let playset: PlaysetData | undefined;
	export let cardDetails: CardDetails;
	export let pairIndex: number;
	export let editable = false;
	export let onRemove: (() => void) | undefined = undefined;

	$: type = cardDetails.table;
	$: colors = cardColors[type];
	$: categories = playset ? getTable(playset, type).categories : undefined;

	function cardRowLink(
		descriptionType: DescriptionType,
		cardDetails: CardDetails,
		pairIndex: number
	) {
		const category = descriptionType === 'category' ? undefined : cardDetails.category;
		let link = `./${cardDetails.table}/${category || ''}`;
		if (editable) {
			link = `${link}?pair=${pairIndex}`;
		}
		return link;
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
		descriptionType="category"
		{editable}
		href={cardRowLink('category', cardDetails, pairIndex)}
	>
		{#if categories && cardDetails.category !== undefined}
			{categories[cardDetails.category].name}
		{:else}
			{fallback('category', editable)}
		{/if}
	</CardRow>
	<CardRow
		descriptionType="element"
		{editable}
		href={cardRowLink('element', cardDetails, pairIndex)}
	>
		{#if categories && cardDetails.category !== undefined && cardDetails.element !== undefined}
			{categories[cardDetails.category].elements[cardDetails.element]}
		{:else}
			{fallback('element', editable)}
		{/if}
	</CardRow>
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
