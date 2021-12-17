<script lang="ts">
	import { getTable } from '$lib/playset';
	import type { PlaysetData } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';
	import { cardColors, cardName, icons } from './card-colors';
	import SelectCardRow from './_SelectCardRow.svelte';

	export let playset: PlaysetData;
	export let cardDetails: CardDetails;
	export let pairIndex: number;
	export let editable = false;
	export let onRemove: (() => void) | undefined = undefined;

	$: type = cardDetails.table;
	$: colors = cardColors[type];
	$: categories = getTable(playset, type).categories;
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
			<g rotate="4">
				<text class="card-heading font-hitchcock" x="190" y="120">{cardName(type)}</text>
			</g>
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
	<SelectCardRow descriptionType="category" {cardDetails} {pairIndex} {editable}>
		{#if cardDetails.category !== undefined}
			{categories[cardDetails.category].name}
		{:else if editable}
			Select category
		{:else}
			&nbsp;
		{/if}
	</SelectCardRow>
	<SelectCardRow descriptionType="element" {cardDetails} {pairIndex} {editable}>
		{#if cardDetails.category !== undefined && cardDetails.element !== undefined}
			{categories[cardDetails.category].elements[cardDetails.element]}
		{:else if editable}
			Select element
		{:else}
			&nbsp;
		{/if}
	</SelectCardRow>
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
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}
</style>
