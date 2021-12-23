<script lang="ts" context="module">
	import { hasTrailingSlash, redirectToNeverTrailingSlash } from '$lib/trailing-slash';
	import { assertInSet, CardType, cardTypes } from '$lib/components/FiascoCard/card-type';
	import { castIndex } from './[card]/_parse-props';

	export const load: import('@sveltejs/kit').Load = async ({ page }) => {
		if (hasTrailingSlash(page)) {
			return redirectToNeverTrailingSlash(page);
		}

		const wanted = page.query.get('wanted');
		const pairIndex = castIndex(page.query.get('pair'), 5);
		const playerIndex = castIndex(page.query.get('player'), 6);
		if (wanted != undefined) {
			assertInSet(wanted, cardTypes);
		}

		return {
			props: {
				playerIndex,
				pairIndex,
				wanted
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
	import { usedCards } from '$lib/storage/session';
	import { changeCard } from '$lib/actions';
	import { goto } from '$app/navigation';

	const { playset, session } = getStoreContext();

	export let playerIndex: number;
	export let pairIndex: number;
	export let wanted: CardType | undefined;

	$: player = $session.players[playerIndex];
	$: title = $playset?.title ?? 'Playset';
	$: cards = Array.from(player.hand ?? []);
	$: used = usedCards($session.pairs);

	function cardKey(cardDetails: CardDetails) {
		return `${cardDetails.table}-${cardDetails.category}:${cardDetails.element}`;
	}

	async function applyCard(cardDetails: CardDetails) {
		await session.dispatch(changeCard(cardDetails.table, pairIndex, cardDetails));
		goto('./setup');
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
				<button
					type="button"
					class="card-clickable card-{cardDetails.table}"
					class:used={used(cardDetails)}
					disabled={wanted !== cardDetails.table}
					on:click={() => applyCard(cardDetails)}
				>
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
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		margin: 1rem;
		gap: 1rem;
		align-content: stretch;
	}

	.card-clickable {
		@include defs.plain-button;
	}
	.card-clickable :global(.item) {
		height: 100%;
	}
	.card-clickable.used {
		opacity: 0.75;
	}
	.card-clickable[disabled] {
		opacity: 0.3;
		cursor: default;
	}
</style>
