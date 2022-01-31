<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Category } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';
	import type { CardOrEngineType } from './card-type';
	import CardRow, { type DescriptionType } from './_CardRow.svelte';
	import Item from './Item.svelte';

	const dispatch = createEventDispatcher<{ remove: undefined }>();

	export let label: string;
	export let cardDetails: CardDetails<CardOrEngineType>;
	export let categories: readonly Category[];
	export let editable = false;
	export let buildHref: (descriptionType: DescriptionType) => string | undefined;
</script>

<Item class={cardDetails.table}>
	<h4 class="card-title" aria-label={label}>
		<slot />
	</h4>
	<button
		type="reset"
		class="remove detail-remove close-button"
		on:click|preventDefault={() => dispatch('remove')}
	>
		<img src="/images/cross-white.svg" alt="Reset" />
	</button>
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="category"
		{editable}
		href={buildHref('category')}
	/>
	<CardRow
		{categories}
		{cardDetails}
		descriptionType="element"
		{editable}
		href={buildHref('element')}
	/>
</Item>

<style lang="scss">
	@use '../../../css/defs';

	:global(.card-graphic) {
		margin: -1em;
		margin-bottom: 0;
	}
	.detail-remove {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.card-title:hover + .detail-remove,
	.detail-remove:hover,
	.detail-remove:focus {
		opacity: 1;
	}
</style>
