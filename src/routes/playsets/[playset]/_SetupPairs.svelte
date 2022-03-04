<script lang="ts">
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';
	import TiltCard from '$lib/components/FiascoCard/TiltCard.svelte';
	import { OutcomeType } from '$lib/outcome';
	import type { Engine } from '$lib/storage/engine';
	import AftermathButton from './_AftermathButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		select: { selectedPlayer: number };
		deselect: undefined;
	}>();

	export let engine: Engine;
	export let activePlayers: number;
	export let showTilt: boolean;
	export let selectedPlayer: number | undefined;

	function onSelect(playerIndex: number) {
		if (selectedPlayer === playerIndex) {
			dispatch('deselect');
		} else {
			dispatch('select', { selectedPlayer: playerIndex });
		}
	}
</script>

<div id="pairs" class="pairs" class:pairs-with-tilt={showTilt}>
	{#if showTilt}
		<div class="pair tilts">
			<h3 class="sr-only">Tilts</h3>
			<TiltCard {engine} outcomeType={OutcomeType.POSITIVE} editable />
			<TiltCard {engine} outcomeType={OutcomeType.NEGATIVE} editable />
			<AftermathButton />
		</div>
	{/if}
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

<style lang="scss">
	@use '../../../css/defs';

	@media (min-width: 40rem) {
		.pairs {
			--tilt-column: 0;
			display: grid;
			align-items: stretch;
			grid-template-columns: repeat(calc(var(--columns) + var(--tilt-column)), minmax(20rem, 1fr));
		}
		.pairs-with-tilt {
			--tilt-column: 1;
		}

		.tilts {
			@include defs.flex($direction: column, $vertical: center, $horizontal: normal);
			order: 0;
			grid-row: 1 / span 2;
			border-right: 1px solid defs.$shadow-color;
		}
	}

	@media (max-width: 40em) {
		.pairs {
			@include defs.flex(column, $horizontal: stretch);
		}
	}
</style>
