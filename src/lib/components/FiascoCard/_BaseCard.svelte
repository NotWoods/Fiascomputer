<script lang="ts">
	import type { Category } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';
	import type { CardOrEngineType } from './card-type';
	import CardRow, { type DescriptionType } from './_CardRow.svelte';

	export let label: string;
	export let cardDetails: CardDetails<CardOrEngineType>;
	export let categories: readonly Category[];
	export let editable = false;
	export let buildHref: (descriptionType: DescriptionType) => string | undefined;
	export let onRemoveCard: (() => void) | undefined = undefined;
	export let onRemoveRow: ((descriptionType: DescriptionType) => void) | undefined = undefined;
</script>

<div class="item {cardDetails.table}">
	<h3 aria-label={label}>
		<slot />
	</h3>
	{#if onRemoveCard}
		<button
			type="reset"
			class="remove detail-remove close-button"
			on:click|preventDefault={onRemoveCard}
		>
			<img src="/images/cross-white.svg" alt="Remove" />
		</button>
	{/if}
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="category"
		{editable}
		href={buildHref('category')}
		onRemove={onRemoveRow}
	/>
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="element"
		{editable}
		href={buildHref('element')}
		onRemove={onRemoveRow}
	/>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.item {
		position: relative;
		padding: 1rem;
		background-color: defs.$yellow-card-background-color;
		@include defs.shadow;
	}
	:global(.card-graphic) {
		margin: -1em;
		margin-bottom: 0;
	}
	.detail-remove {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}
</style>
