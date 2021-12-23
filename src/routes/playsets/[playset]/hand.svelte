<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { castIndex } from './[card]/_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const pairIndex = castIndex(page.query.get('pair'), 5);
		const playerIndex = castIndex(page.query.get('player'), 6);

		return {
			props: {
				playerIndex,
				pairIndex
			}
		};
	};
</script>

<script lang="ts">
	import { getStoreContext } from '$lib/store';
	import Title from '$lib/components/Title.svelte';
	import type { CardDetails } from '$lib/deck';
	import PlayerName from '$lib/components/PlayerName.svelte';
	import SelectCard from '$lib/components/FiascoCard/SelectCard.svelte';
	import PlaysetToolbar from '$lib/components/PlaysetToolbar/PlaysetToolbar.svelte';

	const { playset, session } = getStoreContext();

	export let playerIndex: number;
	export let pairIndex: number;

	$: player = $session.players[playerIndex];
	$: title = $playset?.title ?? 'Playset';
	$: cards = Array.from(player.hand ?? []);

	function cardKey(cardDetails: CardDetails) {
		return `${cardDetails.table}-${cardDetails.category}:${cardDetails.element}`;
	}
</script>

<Title text="Hand | {player.name}" playsetTitle={title} />

<div id="hand" class="page hand-page">
	<PlaysetToolbar>
		<PlayerName slot="title" {playerIndex} editable />
	</PlaysetToolbar>
	<div class="hand-outer">
		<div class="hand">
			{#each cards as cardDetails (cardKey(cardDetails))}
				<button type="button" class="card-{cardDetails.table}">
					<SelectCard {cardDetails} editable={false} {pairIndex} />
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../css/defs';

	.hand {
		display: grid;
		align-items: stretch;
		grid-template-columns: repeat(calc(var(--columns) + var(--tilt-column)), minmax(20rem, 1fr));
	}

	@media (max-width: 40em) {
		.hand-page {
			padding: 0.5rem;
		}
	}
</style>
