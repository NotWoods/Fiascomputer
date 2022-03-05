<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		return {};
	};
</script>

<script lang="ts">
	import { range } from '$lib/storage/session';
	import { changeActivePlayers } from '$lib/actions';
	import { getStoreContext } from '$lib/store';
	import { goto } from '$app/navigation';

	const { playset, session } = getStoreContext();
	const playerOptions = range(3, (i) => i + 3);

	async function handleClick(players: number) {
		await session.dispatch(changeActivePlayers(players, $playset, true));
		await goto('./setup');
	}
</script>

<div id="players" class="page players-page">
	<h2>Number of players</h2>
	<div class="links">
		{#each playerOptions as players}
			<button
				type="button"
				class="players-link"
				id="players-link-{players}"
				on:click={() => handleClick(players)}
			>
				{players} players
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.players-page {
		@include defs.vertical-margin(auto);

		@media (max-width: 40em) {
			padding: 2rem;
		}

		@media (min-width: 40em) {
			padding: 1rem;
		}

		h2 {
			@include defs.page-heading;
		}

		.links {
			@include defs.flex(row, $vertical: center, $horizontal: center);
			flex-wrap: wrap;
		}

		.players-link {
			@include defs.plain-button;
			@include defs.button;
			padding: 1rem;
			font-family: defs.$heading-font;
			font-size: 1.5rem;
			text-align: center;
			margin: 1rem;
		}

		@media (min-width: 40em) {
			.players-link:before {
				display: block;
				content: '';
				width: 5rem;
				height: 7rem;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: 1rem;
				background-repeat: no-repeat;
				background-size: auto 3rem;
			}

			#players-link-3:before {
				background-image: url('/images/player-white.svg'), url('/images/player-white.svg'),
					url('/images/player-white.svg');
				background-position: center top, right bottom, left bottom;
			}

			#players-link-4:before {
				background-image: url('/images/player-white.svg'), url('/images/player-white.svg'),
					url('/images/player-white.svg'), url('/images/player-white.svg');
				background-position: left top, right top, right bottom, left bottom;
			}

			#players-link-5:before {
				width: 7rem;
				background-image: url('/images/player-white.svg'), url('/images/player-white.svg'),
					url('/images/player-white.svg'), url('/images/player-white.svg'),
					url('/images/player-white.svg');
				background-position: left top, right top, right bottom, left bottom, center center;
			}
		}
	}
</style>
