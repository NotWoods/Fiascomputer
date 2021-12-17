<script lang="ts">
	import type { CardDetails } from '$lib/storage/session';

	export let descriptionType: 'category' | 'element';
	export let cardDetails: CardDetails;
	export let pairIndex: number;
	export let editable: boolean;

	$: category = descriptionType === 'category' ? undefined : cardDetails.category
	$: baseLink = `./${cardDetails.table}/${category || ''}`;
	$: linkHref = editable ? `${baseLink}?pair=${pairIndex}` : baseLink;
</script>

<div class="card-description-line {descriptionType}" aria-label={descriptionType}>
	<a
		href={linkHref}
		class="name {descriptionType}-name"
		class:font-hitchcock={descriptionType === 'category'}
		class:font-sans={descriptionType === 'element'}
	>
		<slot />
	</a>
	{#if editable}
		<button class="remove close-button">
			<img src="/images/cross-black.svg" alt="Remove" />
		</button>
	{/if}
</div>

<style>
	.name {
		text-align: left;
	}
	.element-name {
		font-size: 1.1rem;
	}

	.card-description-line {
		margin-top: 1rem;
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
</style>
