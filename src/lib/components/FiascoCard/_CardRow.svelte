<svelte:options immutable={true} />

<script lang="ts" context="module">
	export type DescriptionType = 'category' | 'element';

	const BLANK_SPACE = '\u00a0';
</script>

<script lang="ts">
	import type { Category } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';

	export let categories: readonly Category[] | undefined;
	export let cardDetails: Omit<CardDetails, 'table'>;

	export let descriptionType: DescriptionType;
	export let href: string | undefined = undefined;
	export let editable: boolean;

	$: category =
		categories != undefined && cardDetails.category != undefined
			? categories[cardDetails.category]
			: undefined;
	$: element =
		category != undefined && cardDetails.element != undefined
			? category.elements[cardDetails.element]
			: undefined;
	$: value = descriptionType === 'category' ? category?.name : element;
</script>

<div class="card-description-line {descriptionType}" aria-label={descriptionType}>
	{#if href != undefined}
		<a
			{href}
			class="name {descriptionType}-name"
			class:font-hitchcock={descriptionType === 'category'}
			class:font-sans={descriptionType === 'element'}
			class:unset={value == undefined}
		>
			{#if value != undefined}
				{value}
			{:else if editable}
				Select {descriptionType}
			{:else}
				{BLANK_SPACE}
			{/if}
		</a>
	{:else}
		<span
			class="name {descriptionType}-name"
			class:font-hitchcock={descriptionType === 'category'}
			class:font-sans={descriptionType === 'element'}
			class:unset={value == undefined}
		>
			{#if value != undefined}
				{value}
			{:else}
				{BLANK_SPACE}
			{/if}
		</span>
	{/if}
</div>

<style>
	.element-name {
		font-size: 1.2rem;
	}

	.unset,
	.name:hover,
	.name:focus {
		text-decoration: underline;
	}

	.card-description-line {
		margin-top: 1rem;
		text-align: left;
	}

	.remove {
		opacity: 0;
		margin-left: auto;
	}
	.die:focus ~ .remove,
	.name:focus ~ .remove,
	.remove:focus,
	.card-description-line:hover .remove {
		opacity: 1;
	}
	@media (max-width: 40em) {
		.remove {
			opacity: 0.75;
		}
	}
</style>
