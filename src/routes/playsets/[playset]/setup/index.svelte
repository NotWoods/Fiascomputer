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
	import Title from '$lib/components/Title.svelte';
	import type { Engine } from '$lib/storage/engine';
	import Hand from './_Hand.svelte';
	import SetupPairs from './_SetupPairs.svelte';
	import SetupTilts from './_SetupTilts.svelte';
	import SetupToolbar from './_SetupToolbar.svelte';

	const { playset, session } = getStoreContext();

	export let engine: Engine;
	/** Corresponds to a player index */
	export let openHandPlayerIndex: number | undefined = undefined;

	let showTilt = Boolean(
		$session.tilts.positive.category != undefined || $session.tilts.negative.category != undefined
	);

	$: activePlayers = $session.players.length;
	$: title = $playset?.title ?? 'Playset';

	function closeHand() {
		openHandPlayerIndex = undefined;
	}
</script>

<Title text="Setup" playsetTitle={title} />

<div id="setup" class="page setup-page players-{activePlayers}">
	<SetupToolbar bind:showTilt />
	<div class="pairs-outer" class:pairs-with-tilt={showTilt}>
		<SetupPairs
			{activePlayers}
			selectedPlayer={openHandPlayerIndex}
			on:select={(event) => {
				openHandPlayerIndex = event.detail.selectedPlayer;
			}}
			on:deselect={closeHand}
		>
			{#if showTilt}
				<SetupTilts {engine} />
			{/if}
		</SetupPairs>
	</div>

	{#if openHandPlayerIndex != undefined}
		<Hand playerIndex={openHandPlayerIndex} on:close={closeHand} />
	{/if}
</div>

<style lang="scss">
	@use '../../../../css/defs';

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

	.pairs-with-tilt {
		--tilt-column: 1;
	}

	@media (min-width: 40rem) {
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
		}
	}
</style>
