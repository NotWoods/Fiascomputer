<script lang="ts">
	import Die from '$lib/components/Die.svelte';
	import type { CardType } from './card-colors';

	export let type: CardType;
	export let descriptionType: 'category' | 'element';
	export let category: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;
	export let element: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  $: face = descriptionType === 'category' ? category : element;
</script>

<div class="card-description-line {descriptionType}" aria-label={descriptionType}>
	<button class="die" title="Random!" aria-label="Random {descriptionType}">
		<Die {face} />
	</button>
	<a
		href="./{type}/{category || ''}"
		class="name {descriptionType}-name"
		class:font-hitchcock={descriptionType === 'category'}
		class:font-sans={descriptionType === 'element'}
	>
		{face === 0 ? `Select ${descriptionType}` : face}
	</a>
	<button class="remove close-button">
		<img src="/images/cross-black.svg" alt="Remove" />
	</button>
</div>

<style>
	.element-name {
		font-size: 1.25rem;
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
