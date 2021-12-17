<script lang="ts">
	import Die from '$lib/components/Die.svelte';
	import type { TableIndex } from '$lib/storage/playset';
	import type { CardDetails } from '$lib/storage/session';

	export let descriptionType: 'category' | 'element';
	export let cardDetails: CardDetails
	export let pairIndex: number;

	$: face0Index = cardDetails[descriptionType];
	$: face1Index = (face0Index === undefined ? 0 : face0Index + 1) as TableIndex | 6;
</script>

<div class="card-description-line {descriptionType}" aria-label={descriptionType}>
	<button class="die" title="Random!" aria-label="Random {descriptionType}">
		<Die face={face1Index} />
	</button>
	<a
		href="./{cardDetails.table}/{cardDetails.category || ''}?pair={pairIndex}"
		class="name {descriptionType}-name"
		class:font-hitchcock={descriptionType === 'category'}
		class:font-sans={descriptionType === 'element'}
	>
		<slot />
	</a>
	<button class="remove close-button">
		<img src="/images/cross-black.svg" alt="Remove" />
	</button>
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
