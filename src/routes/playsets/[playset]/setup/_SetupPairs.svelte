<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';

	const dispatch = createEventDispatcher<{
		select: { selectedPlayer: number };
		deselect: undefined;
	}>();

	export let activePlayers: number;
	export let selectedPlayer: number | undefined;

	function onSelect(playerIndex: number) {
		if (selectedPlayer === playerIndex) {
			dispatch('deselect');
		} else {
			dispatch('select', { selectedPlayer: playerIndex });
		}
	}
</script>

<div id="pairs" class="pairs">
	<slot />
	<Player playerIndex={0} editable outcomes selected={selectedPlayer === 0} {onSelect} />
	<Pair pairIndex={0} {activePlayers} editable />
	<Player playerIndex={1} editable outcomes selected={selectedPlayer === 1} {onSelect} />
	<Pair pairIndex={1} {activePlayers} editable />
	<Player playerIndex={2} editable outcomes selected={selectedPlayer === 2} {onSelect} />
	<Pair pairIndex={2} {activePlayers} editable />
	{#if activePlayers >= 4}
		<Player playerIndex={3} editable outcomes selected={selectedPlayer === 3} {onSelect} />
		<Pair pairIndex={3} {activePlayers} editable />
	{/if}
	{#if activePlayers >= 5}
		<Player playerIndex={4} editable outcomes selected={selectedPlayer === 4} {onSelect} />
		<Pair pairIndex={4} {activePlayers} editable />
	{/if}
</div>

<style>
	@media (min-width: 40rem) {
		.pairs {
			display: grid;
			align-items: stretch;
			grid-template-columns: repeat(
				calc(var(--columns) + var(--tilt-column, 0)),
				minmax(20rem, 1fr)
			);
		}
	}

	@media (max-width: 40em) {
		.pairs {
			display: flex;
			flex-direction: column;
		}
	}
</style>
