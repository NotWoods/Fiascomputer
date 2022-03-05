<script lang="ts">
	import OutsideClick from '$lib/components/A11y/OutsideClick.svelte';
	import type { CardDetails } from '$lib/deck';
	import { focusTrap } from '$lib/hooks/focusTrap';
	import { usedCards } from '$lib/storage/session';
	import { getStoreContext } from '$lib/store';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import HandCard from './_HandCard.svelte';

	const { session } = getStoreContext();
	const dispatch = createEventDispatcher();

	export let playerIndex: number;

	let container: HTMLElement;

	$: player = $session.players[playerIndex];
	$: cards = Array.from(player.hand ?? []);
	$: used = usedCards($session.pairs);

	function cardKey(cardDetails: CardDetails) {
		return `${cardDetails.table}-${cardDetails.category}:${cardDetails.element}`;
	}

	function emitClose() {
		dispatch('close');
	}
</script>

<OutsideClick menu={container} trigger={'.hand-trigger'} on:click={emitClose} />

<aside
	bind:this={container}
	id="hand"
	class="hand-container"
	transition:fly={{ duration: 300, x: -100 }}
	use:focusTrap
>
	<header class="hand-header">
		<h3>Hand for {player.name}</h3>
		<button type="button" class="remove close-button" on:click={emitClose}>
			<img src="/images/cross-white.svg" alt="Remove outcome" />
		</button>
	</header>
	<div class="hand">
		{#each cards as cardDetails (cardKey(cardDetails))}
			<HandCard {cardDetails} used={used(cardDetails)} />
		{/each}
	</div>
</aside>

<style>
	.hand-container {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 21rem;
		background: var(--dark-background-color);
		overflow-y: scroll;
	}
	.hand-header {
		color: var(--heading-color);
		display: flex;
		margin: 1rem;
		justify-content: space-between;
	}

	.hand {
		display: grid;
		align-items: stretch;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		margin: 1rem;
		gap: 1rem;
		align-content: stretch;
	}
</style>
