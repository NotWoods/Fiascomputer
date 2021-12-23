<script lang="ts" context="module">
	import { loadBundledEngine } from '$lib/storage/engine';
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page, fetch }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const engine = await loadBundledEngine('normal', fetch);

		return {
			props: {
				engine
			}
		};
	};
</script>

<script lang="ts">
	import { getStoreContext } from '$lib/store';
	import { changeActivePlayers, randomSetup } from '$lib/actions';
	import PlaysetName from '$lib/components/PlaysetToolbar/PlaysetName.svelte';
	import Title from '$lib/components/Title.svelte';
	import { playsetToCards } from '$lib/deck';
	import Pair from './_Pair.svelte';
	import Player from './_Player.svelte';
	import TiltCard from '$lib/components/FiascoCard/TiltCard.svelte';
	import { OutcomeType } from '$lib/outcome';
	import type { Engine } from '$lib/storage/engine';
	import AftermathButton from './_AftermathButton.svelte';

	const { playset, session } = getStoreContext();

	export let engine: Engine;

	let showTilt = Boolean(
		$session.tilts.positive.category != undefined || $session.tilts.negative.category != undefined
	);
	let selectedPlayer: number | undefined;

	$: activePlayers = $session.players.length;
	$: title = $playset?.title ?? 'Playset';

	function handleInvite(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		if (select.value === 'invite') {
			event.preventDefault();
			const destination = new URL('./players', window.location.href);
			window.location.href = destination.href;
		} else {
			session.dispatch(changeActivePlayers(Number(select.value), $playset));
		}
	}

	function onSelect(playerIndex: number) {
		if (selectedPlayer === playerIndex) {
			selectedPlayer = undefined;
		} else {
			selectedPlayer = playerIndex;
		}
	}

	function randomize() {
		const { relationshipCards, detailCards } = playsetToCards($playset);
		session.dispatch(randomSetup(relationshipCards, detailCards));
	}
</script>

<Title text="Setup" playsetTitle={title} />

<div id="setup" class="page setup-page players-{activePlayers}">
	<div class="playset">
		<PlaysetName />
		<div id="player-count-control-box">
			<select id="player-count-control" value={activePlayers.toString()} on:change={handleInvite}>
				<option value="3">3 players</option>
				<option value="4">4 players</option>
				<option value="5">5 players</option>
				<option value="invite">Invite players...</option>
			</select>
		</div>
		<div id="randomize-button-box">
			<button type="button" id="randomize-button" on:click={randomize}>Random!</button>
			<button
				type="button"
				aria-pressed={showTilt}
				on:click={() => {
					showTilt = !showTilt;
				}}>Tilt</button
			>
			<a href="./play" hidden>Play!</a>
		</div>
	</div>
	<div class="pairs-outer">
		<div id="pairs" class="pairs" class:pairs-with-tilt={showTilt}>
			{#if showTilt}
				<div class="pair tilts">
					<TiltCard {engine} outcomeType={OutcomeType.POSITIVE} editable />
					<TiltCard {engine} outcomeType={OutcomeType.NEGATIVE} editable />
					<AftermathButton />
				</div>
			{/if}
			<Player playerIndex={0} editable outcomes selected={selectedPlayer === 0} {onSelect} />
			<Pair pairIndex={0} playerIndex={selectedPlayer} editable />
			<Player playerIndex={1} editable outcomes selected={selectedPlayer === 1} {onSelect} />
			<Pair pairIndex={1} playerIndex={selectedPlayer} editable />
			<Player playerIndex={2} editable outcomes selected={selectedPlayer === 2} {onSelect} />
			<Pair pairIndex={2} playerIndex={selectedPlayer} editable />
			<Player playerIndex={3} editable outcomes selected={selectedPlayer === 3} {onSelect} />
			<Pair pairIndex={3} playerIndex={selectedPlayer} editable />
			<Player playerIndex={4} editable outcomes selected={selectedPlayer === 4} {onSelect} />
			<Pair pairIndex={4} playerIndex={selectedPlayer} editable />
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../css/defs';

	@mixin connector($top: false, $right: false, $bottom: false, $left: false) {
		@include defs.line-through(
			$top: $top,
			$right: $right,
			$bottom: $bottom,
			$left: $left,
			$color: defs.$shadow-color,
			$width: 1rem
		);
	}

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

		.players-3.setup-page {
			--columns: 3;

			:global(#pair-1) {
				order: 1;
			}
			:global(#pair-2) {
				order: 3;
			}
			:global(#pair-3) {
				order: 5;
			}

			:global(#player-1) {
				order: 4;
				@include connector($right: true, $top: true);
			}
			:global(#player-2) {
				order: 2;
				@include connector($left: true, $right: true);
			}
			:global(#player-3) {
				order: 6;
				@include connector($left: true, $top: true);
			}
		}

		.players-4.setup-page {
			--columns: 4;

			:global(#pair-1) {
				order: 1;
			}
			:global(#pair-2) {
				order: 3;
			}
			:global(#pair-3) {
				order: 8;
			}
			:global(#pair-4) {
				order: 6;
			}

			:global(#player-1) {
				order: 5;
				@include connector($right: true, $top: true);
			}
			:global(#player-2) {
				order: 2;
			}
			:global(#player-3) {
				order: 4;
				@include connector($left: true, $bottom: true);
			}
			:global(#player-4) {
				order: 7;
			}
			:global(#player-2),
			:global(#player-4) {
				@include connector($left: true, $right: true);
			}
		}

		.players-5.setup-page {
			--columns: 5;

			:global(#pair-1) {
				order: 1;
			}
			:global(#pair-2) {
				order: 3;
			}
			:global(#pair-3) {
				order: 5;
			}
			:global(#pair-4) {
				order: 9;
			}
			:global(#pair-5) {
				order: 7;
			}

			:global(#player-1) {
				order: 6;
				@include connector($right: true, $top: true);
			}
			:global(#player-2) {
				order: 2;
			}
			:global(#player-3) {
				order: 4;
			}
			:global(#player-4) {
				order: 10;
				@include connector($left: true, $top: true);
			}
			:global(#player-5) {
				order: 8;
			}

			:global(#player-2),
			:global(#player-3),
			:global(#player-5) {
				@include connector($left: true, $right: true);
			}
		}
	}

	@media (max-width: 40em) {
		.setup-page {
			padding: 0.5rem;

			.pairs {
				@include defs.flex(column, $horizontal: stretch);
			}
		}
	}

	.players-3.setup-page {
		:global(#pair-4) {
			display: none;
		}
		:global(#pair-5) {
			display: none;
		}
		:global(#player-4) {
			display: none;
		}
		:global(#player-5) {
			display: none;
		}
	}

	.players-4.setup-page {
		:global(#pair-5) {
			display: none;
		}
		:global(#player-5) {
			display: none;
		}
	}
</style>
